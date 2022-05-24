const search = document.getElementById('search');
const matchlist = document.getElementById('match-list');


//Search states.json and filter it
const searchStates = async searchText => {
    const res = await fetch('../data/states.json');
    const states = await res.json();

    console.log(states);

    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex) || state.capital.match(regex);
    });

    console.log(matches);

    if(searchText.Length === 0) {
        matches = [];
        matchlist.innerHTML = '';
    }

    outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map(match => `
            <div class="card card-body mb-1">
            <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
            <small>Lat: ${match.lat} / Long: ${match.long}</small>
            </div>
        `).join('');

        //console.log(html);

        matchlist.innerHTML = html;
    }
}

search.addEventListener('input', () => searchStates(search.value));