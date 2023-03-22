import React, { useState, useEffect } from 'react';
import { Card, InputGroup } from '../components';

const Episodes = () => {
  const [results, setResults] = useState([])
  const [info, setInfo] = useState([])
  const [id, setID] = useState(1)
  let { air_date, episode, name } = info;

  let api = `https://rickandmortyapi.com/api/episode/${id}`

/* Fetching data from the API and setting the state. */
  useEffect(() => {
    (async function () {
      const data = await fetch(api).then((res) => res.json());
      setInfo(data);
      // console.log(data);
      const a = data.characters.map(async (character) => {
        return await fetch(character).then((res) => res.json);
      });
      setResults(a);

      // const a = Promise.all(
      //   data.characters.map(async (character) => {
      //     return await fetch(character).then((res) => res.json);
      //   })
      // );
      // setResults(a);
      // console.log(a);
    })();
  }, [api])
  return (
    <div className="container">
      <div className="row mb-3">
        <h1 className="text-center mb-3">
          Episode name :{' '}
          <span className="text-primary">{name === "" ? "Unknown" : name}</span>
        </h1>
        <h5 className="text-center">
          Air Date: {air_date === "" ? "Unknown" : air_date}
        </h5>
      </div>
      {/* error here */}
      <div className="row">
        <div className="col-lg-3 col-12 mb-4">
          <h4 className="text-center mb-4">Pick Episode</h4>
          <InputGroup name="Episode" changeID={setID} total={51} />
        </div>
        <div className="col-lg-8 col-12">
          <div className="row">
            <Card results={results} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Episodes