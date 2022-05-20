let token = `b95e854c8f911d49a50f2859d5185cf8506aec042e978d75`

export const serverCalls = {
    get: async () => {
        const response = await fetch(`https://carbon-emissions-database.herokuapp.com/api/carbons`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
        }); 
        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },

    create: async(data: any = {}) => {
        const response = await fetch(`https://carbon-emissions-database.herokuapp.com/api/carbons`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to Create new data on server')
        }

        return await response.json()
    },
    update: async (id:string, data:any = {}) => {
        const response = await fetch(`https://carbon-emissions-database.herokuapp.com/api/carbons/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    },
    delete: async(id:string) => {
        const response = await fetch(`https://carbon-emissions-database.herokuapp.com/api/carbons/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        })
    }
}