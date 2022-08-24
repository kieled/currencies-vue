export const fetchData = () => {
    return fetch('https://www.nbrb.by/api/exrates/rates?periodicity=0')
        .then(result => result.json())
}