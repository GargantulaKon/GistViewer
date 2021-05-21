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
        console.log('response', response)
        stateSetter({[stateObjectName]: propertyFromResponse ? response[propertyFromResponse] : response, isFetching: false})
    } catch (e) {
        console.error(e);
        stateSetter({[stateObjectName]: stateVar[propertyFromResponse], isFetching: false});
    }
}

export {fetcher, setStateViaAPI}