// AuditDNA API Search Service
class AuditDNAApiService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || '/api';
  }

  async search(query, type = 'general') {
    try {
      const response = await fetch(`${this.baseUrl}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, type })
      });
      return await response.json();
    } catch (error) {
      console.error('Search API error:', error);
      return { error: 'Search failed' };
    }
  }

  async upload(file, service, category) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('service', service);
      formData.append('category', category);

      const response = await fetch(`${this.baseUrl}/upload`, {
        method: 'POST',
        body: formData
      });
      return await response.json();
    } catch (error) {
      console.error('Upload API error:', error);
      return { error: 'Upload failed' };
    }
  }
}

export default AuditDNAApiService;