import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ShowSheltersComponent = () => {
    const navigate = useNavigate();
    const [shelters, setShelters] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(false);

    const fetchShelters = async () => {
        console.log('fetch shelters called')
        try {
            const response = await axios.get('/api/shelter');
            setShelters(response.data);
            setShouldUpdate(false);
        } catch (error) {
            console.error('Error fetching shelters: ' + error);
        }
    }

    const handleShowPets = (shelter) => {
        navigate(`/shelter-pets/${shelter.id}`)
    };

    useEffect(() => {
       const fetchData = async () => await fetchShelters();
       fetchData();
    }, [shouldUpdate]);

    const handleDelete = (shelter) => {
        // api call to delete the shelter
        try {
            axios.delete(`/api/shelter/${shelter.id}`);
            setShelters(shelters.filter(each => each.id !== shelter.id));
        } catch (error) {
            console.error('Error deleting shelter');
        }
    };

    const handleAddEdit = (shelter) => {
        navigate(`/edit-shelter/${shelter.id}`, { state: { shelter }});
    };

return (
    <>
        <h2>Shelters</h2>
        <button onClick={() => handleAddEdit({})}>Add Shelter</button>
        {shelters.map(shelter => (
            <div key={shelter.id}>
                <nav>
                    <ul>
                        <li>{shelter.name}</li>
                        <li><button onClick={() => handleAddEdit(shelter)}>Edit</button></li>
                        <li><button onClick={() => handleDelete(shelter)}>Delete</button></li>
                        <li><button onClick={() => handleShowPets(shelter)}>View Pets</button></li>
                    </ul>
                </nav>
            </div>
        ))}

    </>
)
};

export default ShowSheltersComponent;