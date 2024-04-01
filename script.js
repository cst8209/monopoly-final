// Elements
const $properties = document.getElementById('properties')
const $more = document.getElementById('more')
const $dialog = document.getElementById('dialog')

// Data
const deck = []

// Functions
function displayProperties (properties) {
  deck.push(...properties)
  $properties.innerHTML = deck.reduce((html, prop) => html + `
  <div class="property" data-id="${prop.id}">
    <div class="property-group" style="background-color: ${prop.group}"></div>
    <h2 class="property-title">${prop.name}</h2>
    <p class="property-price">Price: $${prop.price}</p>
  </div>
  `, '')
}

function displayDeed (property) {
  $dialog.innerHTML = `
  <div class="deed">
    <div style="background-color: ${property.group}">
      <h2 class="deed-title">${property.name}</h2>
    </div>
    <div class="deed-rent">Rent $${property.rent}.</div>
    <div class="deed-improved-rents">
      ${property.improved_rents.reduce((html, item) => html + `
        <p class="deed-improvement">${item.improvement}</p>
        <p class="deed-rent">${item.rent}.</p>
      `, '')}
    </div>
  </div>`
}

// Listeners
$more.addEventListener('click', async function (e) {
  const response = await fetch('https://monopoly.zoodinkers.com/api/properties?offset=' + deck.length)
  const properties = await response.json()
  displayProperties(properties)
})

$properties.addEventListener('click', async function (e) {
  const $property = e.target.closest('.property')
  if ($property) {
    const response = await fetch('https://monopoly.zoodinkers.com/api/properties/' + $property.dataset.id)
    const property = await response.json()
    displayDeed(property)
    $dialog.showModal() 
  }
})

$dialog.addEventListener('click', function () {
  $dialog.close();
})

fetch('https://monopoly.zoodinkers.com/api/properties')
  .then(response => response.json())
  .then(displayProperties)