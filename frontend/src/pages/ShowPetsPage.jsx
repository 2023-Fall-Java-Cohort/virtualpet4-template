import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShowPetsPage = () => {
    const [pets, setPets] = useState([]);
    const { shelterId } = useParams();

    useEffect(() => {
        axios.get(`/api/pet/shelter/${shelterId}`)
        .then(response => setPets(response.data))
        .catch(error => console.error("Error fetching pets", error));

    }, [shelterId])

    return (
        <>
            <h2>Pets</h2>
            <ul>
                {pets.map(pet =>
                (
                    <li key={pet.id}>
                        {pet.name}
                        {/* add buttons for edit/delete */}
                    </li>
                ))
                }
            </ul>
        </>
    )
};

export default ShowPetsPage;