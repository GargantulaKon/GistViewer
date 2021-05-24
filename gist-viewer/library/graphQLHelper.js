const fetcher = async (query) => {
    let fetchCall = await fetch('/api/graphql', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({query}),
        }),
        json = await fetchCall.json()
    return await json.data
}

const setStateViaAPI = async (stateVar, stateSetter, stateObjectName, graphQLQuery, propertyFromResponse) => {
    try {
        stateSetter({[stateObjectName]: stateVar[propertyFromResponse], isFetching: true});
        const response = await fetcher(graphQLQuery);
        console.log(response)
        stateSetter({
            [stateObjectName]: propertyFromResponse ? response[propertyFromResponse] : response,
            isFetching: false
        })
    } catch (error) {
        console.error(error);
        alert('Error! Check database connection limit at https://customer.elephantsql.com/login')
        stateSetter({[stateObjectName]: stateVar[propertyFromResponse], isFetching: false});
    }
}

const addOrRemoveFavorite = async (graphQLQuery) => {
    try {
        return await fetcher(graphQLQuery);
    } catch (e) {
        console.error(e);
    }
}

export {fetcher, setStateViaAPI, addOrRemoveFavorite}