import { useState, useEffect } from 'react';
import { Inbox as InboxIcon, RefreshCw, AlertCircle, Mail, Paperclip, Download, Eye, FileText, Image, FileArchive, FileVideo, FileAudio } from 'lucide-react';
import { mailAPI, MessageSummary, MessageDetails } from '@/lib/mail-api';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface InboxProps {
  refreshTrigger: number;
}

export default function Inbox({ refreshTrigger }: InboxProps) {
  const [messages, setMessages] = useState<MessageSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<MessageDetails | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const newMessages = await mailAPI.fetchMessages();
      setMessages(newMessages);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch messages';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMessageClick = async (messageId: string) => {
    try {
      const messageDetails = await mailAPI.getMessage(messageId);
      if (messageDetails) {
        setSelectedMessage(messageDetails);
        setModalOpen(true);
        await mailAPI.markMessageAsRead(messageId);
        // Update local message state to mark as read
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, seen: true } : msg
        ));
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load message details",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [refreshTrigger]);

  // Auto-refresh messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Unknown';
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const getFileIcon = (contentType: string) => {
    if (contentType.startsWith('image/')) return Image;
    if (contentType.startsWith('video/')) return FileVideo;
    if (contentType.startsWith('audio/')) return FileAudio;
    if (contentType.includes('zip') || contentType.includes('archive')) return FileArchive;
    return FileText;
  };

  const isPreviewable = (contentType: string) => {
    return contentType.startsWith('image/') || 
           contentType.startsWith('text/') || 
           contentType === 'application/pdf';
  };

  const handleDownloadAttachment = async (attachmentUrl: string, filename: string) => {
    try {
      const response = await fetch(attachmentUrl);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Download started",
        description: `Downloading ${filename}`,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download the attachment",
        variant: "destructive",
      });
    }
  };

  const handlePreviewAttachment = (attachmentUrl: string, filename: string) => {
    window.open(attachmentUrl, '_blank');
    toast({
      title: "Opening preview",
      description: `Opening ${filename} in new tab`,
    });
  };

  const hasUnreadMessages = messages.some(msg => !msg.seen);

  return (
    <div className="animate-fade-in">
      <div className="bg-card border border-border rounded-xl shadow-sm">
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
              <InboxIcon className="w-5 h-5 text-primary" />
              <span>Inbox</span>
              {messages.length > 0 && (
                <span className="text-sm text-muted-foreground">({messages.length})</span>
              )}
            </h2>
            <div className="flex items-center space-x-2">
              {hasUnreadMessages && (
                <div 
                  className="w-2 h-2 bg-primary rounded-full animate-pulse"
                  data-testid="indicator-new-messages"
                />
              )}
              <button 
                onClick={fetchMessages}
                disabled={loading}
                className="text-muted-foreground hover:text-foreground p-1 rounded transition-colors disabled:opacity-50"
                data-testid="button-refresh-inbox"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="min-h-[200px]" data-testid="inbox-content">
          {error ? (
            <div className="text-center py-12 px-4">
              <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
              <p className="text-destructive mb-2">Failed to load messages</p>
              <p className="text-sm text-muted-foreground">{error}</p>
              <button 
                onClick={fetchMessages}
                className="mt-4 text-sm text-primary hover:text-primary/80 underline"
              >
                Try again
              </button>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12 px-4" data-testid="empty-inbox">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-2">No messages yet</p>
              <p className="text-sm text-muted-foreground">Messages will appear here automatically when received</p>
            </div>
          ) : (
            <div data-testid="messages-container">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  onClick={() => handleMessageClick(message.id)}
                  className="message-item border-b border-border last:border-b-0 p-4 hover:bg-muted/20 cursor-pointer"
                  data-testid={`message-item-${message.id}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-sm font-medium text-foreground truncate">
                          {message.from.name || message.from.address}
                        </p>
                        {!message.seen && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-foreground font-medium mb-1 truncate">
                        {message.subject || 'No subject'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {truncateText(message.intro || 'No preview available', 60)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-1 ml-4 flex-shrink-0">
                      <span className="text-xs text-muted-foreground">
                        {formatTime(message.createdAt)}
                      </span>
                      {message.hasAttachments && (
                        <Paperclip className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold pr-8">
                  {selectedMessage.subject || 'No subject'}
                </DialogTitle>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><span className="font-medium">From:</span> {selectedMessage.from.name || selectedMessage.from.address}</p>
                  <p><span className="font-medium">Date:</span> {new Date(selectedMessage.createdAt).toLocaleString()}</p>
                </div>
              </DialogHeader>
              <div className="overflow-y-auto max-h-[60vh] p-4 -mx-4">
                <div className="prose prose-sm max-w-none text-foreground">
                  {selectedMessage.html && selectedMessage.html.length > 0 ? (
                    <div dangerouslySetInnerHTML={{ __html: selectedMessage.html[0] }} />
                  ) : (
                    <pre className="whitespace-pre-wrap font-mono text-sm">
                      {selectedMessage.text || 'No content available'}
                    </pre>
                  )}
                </div>
                {selectedMessage.hasAttachments && selectedMessage.attachments && (
                  <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium text-foreground mb-3">Attachments:</p>
                    <div className="space-y-2">
                      {selectedMessage.attachments.map((attachment) => {
                        const FileIcon = getFileIcon(attachment.contentType);
                        const canPreview = isPreviewable(attachment.contentType);
                        
                        return (
                          <div 
                            key={attachment.id} 
                            className="flex items-center justify-between p-2 bg-background/50 rounded-lg border border-border/50"
                            data-testid={`attachment-${attachment.id}`}
                          >
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                              <FileIcon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-foreground truncate" title={attachment.filename}>
                                  {attachment.filename}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {(attachment.size / 1024).toFixed(1)} KB • {attachment.contentType}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 flex-shrink-0">
                              {canPreview && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handlePreviewAttachment(attachment.downloadUrl, attachment.filename)}
                                  className="h-8 w-8 p-0"
                                  data-testid={`button-preview-${attachment.id}`}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDownloadAttachment(attachment.downloadUrl, attachment.filename)}
                                className="h-8 w-8 p-0"
                                data-testid={`button-download-${attachment.id}`}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
