// Mock API functions
const api = {
    login: async (credentials) => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, token: 'mock-token' });
            }, 1000);
        });
    },

    registerSeller: async (data) => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, sellerId: 'SELLER123' });
            }, 1000);
        });
    },

    searchMaterials: async (query) => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(sampleListings.filter(listing => 
                    listing.title.toLowerCase().includes(query.toLowerCase())
                ));
            }, 500);
        });
    }
};

export default api; 