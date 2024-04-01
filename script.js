// Elements
const $properties = document.getElementById('properties')
const $more = document.getElementById('more')
const $dialog = document.getElementById('dialog')

// Data


// Functions


// Listeners
$properties.addEventListener('click', async function (e) {
  $dialog.showModal()
})

$dialog.addEventListener('click', function () {
  $dialog.close();
})