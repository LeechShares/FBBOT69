const version = "1.0.1";
const news = `	<h3>Version: ${version}</h3>
	<ul>
	<li>New FCA</li>
	<li>Added New Commands</li>
	</ul>`;
document.getElementById("news").innerHTML = news;


document.addEventListener("DOMContentLoaded", function() {
    var firstModal = document.getElementById('firstModal');
    var secondModal = document.getElementById('secondModal');
    var span = document.getElementsByClassName("close");

    // Display the first modal when the page loads
    firstModal.style.display = "block";
    secondModal.style.display = "none";

    // Close the modals when the close button is clicked
    for (var i = 0; i < span.length; i++) {
        span[i].onclick = function() {
            firstModal.style.display = "none";
            secondModal.style.display = "none";
        }
    }

    // Open the second modal when the button is clicked
    var openSecondModalBtn = document.getElementById("openSecondModalBtn");
    openSecondModalBtn.onclick = function() {
        secondModal.style.display = "block";
    }
}); 
/*
document.addEventListener("DOMContentLoaded", function() {

    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        } 
    }
});
*/
 //  <script>
         async function listOfAi() {
             const userOnline = document.getElementById("user_online");
             try {
                 const response = await fetch("/info");
                 const data = await response.json();
                 userOnline.innerHTML = '';
                 data.forEach(user => {
                     const {
                         name,
                         thumbSrc,
                         profileUrl,
                         time,
                     } = user;
                     const userCard = document.createElement('div');
                     userCard.className = 'col-12 user-card mb-4';
                     const image = document.createElement('img');
                     image.src = thumbSrc;
                     image.alt = 'User Thumbnail';
                     image.className = 'img-thumbnail';
                     const userInfo = document.createElement('div');
                     userInfo.className = 'user-info';
                     const userName = document.createElement('h4');
                     userName.textContent = name;
                     const profileLink = document.createElement('p');
                     profileLink.innerHTML = `${profileUrl}`;
                     const uptimeUser = document.createElement('p');
                     uptimeUser.className = 'uptime-user';
                     uptimeUser.innerHTML = `Uptime: ${timeFormat(time)}`;
                     userInfo.appendChild(userName);
                     userInfo.appendChild(profileLink);
                     userInfo.appendChild(uptimeUser);
                     userCard.appendChild(image);
                     userCard.appendChild(userInfo);
                     userOnline.appendChild(userCard);
         
                     const intervalId = setInterval(() => {
                         user.time++;
                         updateTimer(userCard, user.time);
                     }, 1000);
                 });
             } catch (error) {
                 console.error(error);
                 userOnline.innerHTML = `<div class="alert alert-danger" role="alert">An error occurred while fetching data.</div>`;
             }
         }
         
         function updateTimer(userCard, currentTime) {
             const uptimeUser = userCard.querySelector('.uptime-user');
             uptimeUser.textContent = `Uptime: ${timeFormat(currentTime)}`;
         }
         
        function timeFormat(currentTime) {
            const days = Math.floor(currentTime / (3600 * 24));
            const hours = Math.floor((currentTime % (3600 * 24)) / 3600);
            const minutes = Math.floor((currentTime % 3600) / 60);
            const seconds = currentTime % 60;

            let timeFormat = '';

            switch (true) {
                case days > 0:
                    timeFormat += `${days} day${days > 1 ? 's' : ''} `;
                case hours > 0:
                    timeFormat += `${hours} hour${hours > 1 ? 's' : ''} `;
                case minutes > 0:
                    timeFormat += `${minutes} minute${minutes > 1 ? 's' : ''} `;
                default:
                    timeFormat += `${seconds} second${seconds > 1 ? 's' : ''}`;
            }

            return timeFormat.trim();
        }

         
         listOfAi();
         