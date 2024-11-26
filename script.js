document.getElementById('searchInput').addEventListener('input', function () {
    var query = this.value.toLowerCase();
    var boxes = document.querySelectorAll('.box');
    var firstMatch = null;

    if (query === '') {
        boxes.forEach(function (box) {
            var links = box.querySelectorAll('a');
            links.forEach(function (link) {
                link.style.pointerEvents = 'auto';
                link.style.opacity = '1';
                link.textContent = link.textContent;
            });
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    boxes.forEach(function (box) {
        var links = box.querySelectorAll('a');
        links.forEach(function (link) {
            var linkText = link.textContent.toLowerCase();
            link.style.pointerEvents = 'auto';
            link.style.opacity = '1';
            link.textContent = link.textContent;

            if (linkText.includes(query)) {
                if (!firstMatch) {
                    firstMatch = link;
                }
            } else {
                link.style.pointerEvents = 'none';
                link.style.opacity = '0.5';
            }
        });
    });

    if (firstMatch) {
        var headerHeight = document.querySelector('.header').offsetHeight;
        var windowHeight = window.innerHeight;
        var elementTop = firstMatch.getBoundingClientRect().top + window.scrollY;
        var offset = elementTop - (windowHeight / 2) + (firstMatch.offsetHeight / 2);

        // Scroll to the position that centers the first match vertically
        window.scrollTo({ top: offset, behavior: 'smooth' });
    }
});

document.addEventListener('click', function (event) {
    if (event.target && event.target.tagName === 'A') {
        var clickedLink = event.target;
        var query = document.getElementById('searchInput').value.toLowerCase();
        var linkText = clickedLink.textContent.toLowerCase();

        if (linkText.includes(query)) {
            clickedLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});
