export interface Domain {
  id: string;
  domain: string;
  isActive: boolean;
  isPrivate: boolean;
}

export interface Account {
  id: string;
  address: string;
  quota: number;
  used: number;
  isDisabled: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MessageSummary {
  id: string;
  accountId: string;
  msgid: string;
  from: {
    name?: string;
    address: string;
  };
  to: Array<{
    name?: string;
    address: string;
  }>;
  subject: string;
  intro?: string;
  seen: boolean;
  isDeleted: boolean;
  hasAttachments: boolean;
  size: number;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageDetails extends MessageSummary {
  text?: string;
  html?: string[];
  attachments?: Array<{
    id: string;
    filename: string;
    contentType: string;
    disposition: string;
    transferEncoding: string;
    related: boolean;
    size: number;
    downloadUrl: string;
  }>;
}

export interface AuthToken {
  id: string;
  token: string;
}

const API_BASE = 'https://api.mail.tm';

class MailAPI {
  private authToken: string | null = null;

  async fetchDomains(): Promise<Domain[]> {
    try {
      const response = await fetch(`${API_BASE}/domains`);
      if (!response.ok) {
        throw new Error(`Failed to fetch domains: ${response.status}`);
      }
      const data = await response.json();
      return data['hydra:member'].filter((domain: Domain) => domain.isActive);
    } catch (error) {
      console.error('Error fetching domains:', error);
      throw new Error('Unable to fetch available domains. Please try again.');
    }
  }

  async createAccount(email: string, password: string): Promise<Account> {
    try {
      const response = await fetch(`${API_BASE}/accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: email,
          password: password
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Failed to create account: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating account:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unable to create email account. Please try again.');
    }
  }

  async getAuthToken(email: string, password: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: email,
          password: password
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Failed to authenticate: ${response.status}`);
      }
      
      const data: AuthToken = await response.json();
      this.authToken = data.token;
      return data.token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unable to authenticate email account. Please try again.');
    }
  }

  async fetchMessages(): Promise<MessageSummary[]> {
    if (!this.authToken) {
      throw new Error('No authentication token available');
    }
    
    try {
      const response = await fetch(`${API_BASE}/messages`, {
        headers: {
          'Authorization': `Bearer ${this.authToken}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication expired. Please refresh the page.');
        }
        throw new Error(`Failed to fetch messages: ${response.status}`);
      }
      
      const data = await response.json();
      return data['hydra:member'] || [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unable to fetch messages. Please try again.');
    }
  }

  async getMessage(messageId: string): Promise<MessageDetails | null> {
    if (!this.authToken) {
      throw new Error('No authentication token available');
    }
    
    try {
      const response = await fetch(`${API_BASE}/messages/${messageId}`, {
        headers: {
          'Authorization': `Bearer ${this.authToken}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication expired. Please refresh the page.');
        }
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch message: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching message details:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unable to fetch message details. Please try again.');
    }
  }

  async markMessageAsRead(messageId: string): Promise<void> {
    if (!this.authToken) {
      throw new Error('No authentication token available');
    }
    
    try {
      const response = await fetch(`${API_BASE}/messages/${messageId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.authToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok && response.status !== 200) {
        console.warn(`Failed to mark message as read: ${response.status}`);
      }
    } catch (error) {
      console.warn('Error marking message as read:', error);
    }
  }

  generateRandomEmail(domains: Domain[], selectedDomain?: Domain): { email: string; password: string } {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const generateString = (length: number) => {
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };

    const username = generateString(8);
    const password = generateString(12);
    const domain = selectedDomain || domains[Math.floor(Math.random() * domains.length)];
    
    return {
      email: `${username}@${domain.domain}`,
      password
    };
  }
}

export const mailAPI = new MailAPI();
