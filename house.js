// manipulating the Html documents
const houses = [{id:1, title:"2 Bedroom Flat", location:"Orlu", area:"Beside IMSU junction", price:500000, bedrooms:2, type:"Flat", img:"https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600", verified:true},
     {id:2, title:"Self-Contain", location:"Owerri", area:"Nekede Road", price:250000, bedrooms:1, type:"Self-con", img:"https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600", verified:true},
     {id:3, title:"3 Bedroom Bungalow", location:"Orlu", area:"Banana Junction", price:750000, bedrooms:3, type:"Bungalow", img:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600", verified:true},
     {id:4, title:"1 Bedroom Flat", location:"Ihiagwa", area:"FUTO Gate", price:350000, bedrooms:1, type:"Flat", img:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600", verified:true},
     {id:5, title:"2 Bedroom Flat", location:"Nekede", area:"Poly Nekede", price:480000, bedrooms:2, type:"Flat", img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600", verified:true},
     {id:6, title:"Single Room", location:"Owerri", area:"World Bank", price:150000, bedrooms:1, type:"Single", img:"https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=600", verified:false},
];

let favorites = JSON.parse(localStorage.getItem('favs') || '[]');

function renderHouses(list){
     const grid = document.getElementById('houseGrid');
     grid.innerHTML = list.map(h => `
          <div class="col-md-4">
               <div class="card card-house h-100">
                    <div class="position-relative">
                         <img src="${h.img}" class="card-img-top">
                         
                         <span class="badge-location"><i class="bi bi-geo-alt"></i>${h.location}</span>
                         <button class="btn-fav ${favorites.includes(h.id)? 'active':''}" onclick="toggleFav(${h.id})">
                         <i class="bi bi-heart${favorites.includes(h.id)? '-fill':''}"></i>
                         </button>
                    </div>
                    <div class="card-body">
                    ${h.verified?`<span class="badge bg-success rounded-pill mb-2">
                         <i class="bi bi-patch-check"></i> Verified</span>`:''}
                              <h5 class="fw-bold">${h.title}</h5>
                              <p class="text-muted small mb-1">${h.area}, ${h.location} ⚫ ${h.bedrooms} Bed</p>
                              <h6 class="fw-bold text-primary">$${h.price.toLocaleString()}/year</h6>
                              <div class="d-flex gap-2 mt-3">
                                   <button class="btn btn-dark rounded-pill w-100" onclick="openModal(${h.id})">Quick View</button>
                                   <a href="house-details.html?id=${h.id}" class="btn btn-outline-dark rounded-pill w-100">Details Page</a>
                         </div>
                    </div>
               </div>
          </div>
     `).join('');
     document.getElementById('favCount').innerHTML = favorites.length;
}

function openModal(id){
     const h = houses.find(x=>x.id===id);
     document.getElementById('modalBody').innerHTML = `
     <img src="${h.img}" class="w-100" style="height:300px; oject-fit-cover; border-radius:20px 20px 0 0">
     <div class="p-4">
          <h3 class="fw-bold">${h.title} - ${h.location}</h3>
          <p>${h.area}</p>
          <p><b>Price:</b> $${h.price.toLocaleString()}/ year</p>
          <p><b>Bedrooms:</b> ${h.bedrooms}</p>
          <div class="d-flex gap-2">
               <a href="https://wa.me/2348000000000?text=Hi, I'm interested in ${h.title} at ${h.location}" class="btn btn-success rounded-pill w-100"><i class="bi bi-whatsapp"></i> Chat Landlord</a>
               <button class="btn btn-dark rounded-pill w-100" data-bs-dismiss="modal">Close</button>
          </div>
     </div>`;
     new bootstrap.Modal(document.getElementById('houseModal')).show();
}

// toggle btw fav
function toggleFav(id){
     if(favorites.includes(id)){ favorites = favorites.filter(f=>f!==id) } else { favorites.push(id) }
     localStorage.setItem('favs', JSON.stringify(favorites));
     applyFilters();
}
// Applying Filter
function applyFilters(){
     const search = document.getElementById('searchInput').value.toLowerCase();
     const loc = document.getElementById('locationFilter').value;
     const bed = document.getElementById('bedroomFilter').value;
     const price = document.getElementById('priceFilter').value;

let filtered = houses.filter(h=>{
     return (h.title.toLowerCase().includes(search) || h.location.toLowerCase().includes(search) || h.area.toLowerCase().includes(search)) &&
               (loc==='all' || h.location===loc) &&
               (bed==='all' || h.bedrooms==bed) &&
               (price==='all' || (price==='400' && h.price<400000) || (price==='600' && h.price>=400000 && h.price<=600000) || (price==='1000' && h.price>600000))
     });
renderHouses(filtered);
}

function resetFilters(){
     document.getElementById('searchInput').value='';
     document.getElementById('locationFilter').value='all';
     document.getElementById('bedroomFilter').value='all';
     document.getElementById('priceFilter').value='all';
     renderHouses(houses);
}

document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('locationFilter').addEventListener('change', applyFilters);
document.getElementById('bedroomFilter').addEventListener('change', applyFilters);
document.getElementById('priceFilter').addEventListener('change', applyFilters);

renderHouses(houses);