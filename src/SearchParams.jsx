import { useState } from "react";
import useBreedList from "./useBreedList";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import Results from "./Results";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  const animalChangeHandler = (event) => {
    setAnimal(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const obj = {
      animal: formData.get("animal") ?? "",
      breed: formData.get("breed") ?? "",
      location: formData.get("location") ?? "",
    };
    setRequestParams(obj);
  };

  return (
    <div className="search-params">
      <form action="" onSubmit={submitHandler}>
        <label htmlFor="location">
          Location
          <input
            id="location"
            name="location"
            placeholder="location"
            type="text"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select id="animal" value={animal} onChange={animalChangeHandler}>
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed" name="breed" disabled={breeds.length === 0}>
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
