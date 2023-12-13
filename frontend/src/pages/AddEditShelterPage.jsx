import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AddEditShelterPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const shelter = location.state?.shelter;
    const [name, setName] = useState(shelter ? shelter.name : '')
    const [id, setId] = useState(shelter ? shelter.id : '')
    // const [shelters, setShelters] = 

    const handleSubmit = async (event) => {
        event.preventDefault();
        const shelterData = { name, id }; // the shelter we are sending to the server

        try {
            let updatedShelters;
            // edit existing shelter
            if (shelter && shelter.id) {
                await axios.put('/api/shelter', shelterData);
                // updatedShelters = shelters.map (s => s.id === shelter.id ? { ...s, ...shelterData } : s);
            }
            else {
                // new shelter
                await axios.post('/api/shelter', shelterData);
                // updatedShelters = [...shelters, response.data];
            }
            navigate('/shelters');
        } catch (error) {
            console.error("Error saving shelter: ", error);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value ={name} onChange={e => setName(e.target.value)} />
            <button type="submit">Save Shelter</button>
        </form>
    )
}

export default AddEditShelterPage;


//  function go (...everything) {
//     console.log(everything) /// [1,2,3,4,5]
//  }
// go(1,2,3,4,5)