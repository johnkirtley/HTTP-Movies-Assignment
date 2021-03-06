import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    title: '',
    director: '',
    metascore: '',
}


const UpdateMovie = (props) => {
    console.log(props)
    const [movie, setMovie] = useState(initialState);

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => {
                setMovie(res.data);
            })
    }, [props.match.params.id])

    const handleSubmit = e => {
        e.preventDefault();

        axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
            .then(res => {
                props.history.push(`/movies/${movie.id}`);
            })
            .catch(err => console.log(err));
    }



    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title"></label>
            <input type="text" name="title" onChange={handleChange} placeholder="Title" />

            <label htmlFor="director"></label>
            <input type="text" name="director" onChange={handleChange} placeholder="Director" />

            <label htmlFor="metascore"></label>
            <input type="text" name="metascore" onChange={handleChange} placeholder="Metascore" />

            <button type="submit">Update Movie</button>
        </form>
    )
}

export default UpdateMovie;