import fetch from 'cross-fetch'

const randomNumb = (min,max)=>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getPokemons = () => {
    return (dispatch) => {
        let pokemons = []
        let numbers =[ randomNumb(1,801),randomNumb(1,801),randomNumb(1,801),]



        fetch('https://pokeapi.co/api/v2/pokemon/' + numbers[0]).then((response) =>{
            return response.json()
        }).then((json) =>{
            let pokemon = {
                    name:json.name,
                    img: json.sprites.front_default,
                    types: json.types,
                    stats:{}
                }
                json.stats.map((stat)=>{
                    pokemon.stats[stat.stat.name] = stat.base_stat
                })

            pokemons.push(pokemon)


        }).catch((ex)=>{
            console.log('parsing failed', ex)
        }).then(()=>{
            fetch('https://pokeapi.co/api/v2/pokemon/'+ numbers[1]).then((response) =>{
                return response.json()
            }).then((json) =>{
                let pokemon = {
                    name:json.name,
                    img: json.sprites.front_default,
                    types: json.types,
                    stats:{}
                }
                json.stats.map((stat)=>{
                    pokemon.stats[stat.stat.name] = stat.base_stat
                })

                pokemons.push(pokemon)


            }).catch((ex)=>{
                console.log('parsing failed', ex)
            }).then(()=>{
                fetch('https://pokeapi.co/api/v2/pokemon/'+ numbers[2]).then((response) =>{
                    return response.json()
                }).then((json) =>{
                    let pokemon = {
                        name:json.name,
                        img: json.sprites.front_default,
                        types: json.types,
                        stats:{}
                    }
                    json.stats.map((stat)=>{
                        pokemon.stats[stat.stat.name] = stat.base_stat
                    })

                    pokemons.push(pokemon)


                }).catch((ex)=>{
                    console.log('parsing failed', ex)
                }).then(()=>{
                    dispatch({ type: 'GET_POKEMONS_SUCCESS', pokemons:  pokemons})
                })
            })
        })

    }
};