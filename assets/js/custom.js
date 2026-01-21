// Плавна прокрутка до секцій
document.addEventListener('DOMContentLoaded', function() {
// Знаходимо всі посилання, які ведуть до якорів на сторінці
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
    link.addEventListener('click', function(e) {
        // Отримуємо значення href
        const targetId = this.getAttribute('href');
        
        // Перевіряємо, чи це не просто "#"
        if (targetId === '#' || targetId === '') return;
        
        // Знаходимо цільову секцію
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Запобігаємо стандартній поведінці
            e.preventDefault();
            
            // Плавно прокручуємо до секції
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Опціонально: оновлюємо URL без перезавантаження сторінки
            history.pushState(null, null, targetId);
        }
    });
});

// Функція для визначення активної секції
function setActiveMenuItem() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const menuLinks = document.querySelectorAll('.menuzord-menu li');
    const menuHeight = document.getElementById('main-menu').offsetHeight;
    
    // Отримуємо поточну позицію скролу з урахуванням висоти меню
    const scrollPosition = window.scrollY + menuHeight + 10;
    
    let activeSection = null;
    
    // Шукаємо активну секцію
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // Ігноруємо секції без id або з id, яких немає в меню
        if (!sectionId) return;
        const menuItem = document.querySelector(`.menuzord-menu a[href="#${sectionId}"]`);
        if (!menuItem) return;
        
        // Перевіряємо, чи знаходимось ми в межах секції
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            activeSection = sectionId;
        }
    });
    
    // Спеціальна перевірка для останньої секції (contacts)
    const lastSection = Array.from(sections).filter(s => {
        const id = s.getAttribute('id');
        return id && document.querySelector(`.menuzord-menu a[href="#${id}"]`);
    }).pop();
    
    if (lastSection) {
        const lastSectionTop = lastSection.offsetTop;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        
        // Якщо доскролили майже до кінця сторінки
        if (window.scrollY + windowHeight >= documentHeight - 100) {
            activeSection = lastSection.getAttribute('id');
        }
    }
    
    // Якщо скрол на самому верху, активуємо першу секцію
    if (window.scrollY < 100) {
        const firstSection = Array.from(sections).find(s => {
            const id = s.getAttribute('id');
            return id && document.querySelector(`.menuzord-menu a[href="#${id}"]`);
        });
        if (firstSection) {
            activeSection = firstSection.getAttribute('id');
        }
    }
    
    // Оновлюємо активний клас ТІЛЬКИ в головному меню
    document.querySelectorAll('.menuzord-menu li').forEach(link => {
        link.classList.remove('active');
    });
    
    if (activeSection) {
        const activeLink = document.querySelector(`.menuzord-menu a[href="#${activeSection}"]`);
        if (activeLink) {
            activeLink.parentElement.classList.add('active');
        }
    }
}

    // Викликаємо функцію при скролі з невеликою затримкою для оптимізації
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            setActiveMenuItem();
        });
    });

    // Викликаємо функцію при завантаженні сторінки
    setActiveMenuItem();
});

// Скрипт для fixed меню при скролі
window.addEventListener('scroll', function() {
	const mainMenu = document.getElementById('main-menu');
	
	if (window.scrollY > 1) {
		mainMenu.classList.add('scrolled');
		document.body.style.paddingTop = mainMenu.offsetHeight + 'px';
	} else {
		mainMenu.classList.remove('scrolled');
		document.body.style.paddingTop = '0';
	}
});

document.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('contactForm');
	const submitButton = form.querySelector('.sendMessageButton');

	// Очищення помилок при введенні
	['name', 'email', 'text'].forEach(fieldName => {
		document.getElementById(fieldName).addEventListener('input', function() {
			document.getElementById(`error-${fieldName}`).style.display = 'none';
			this.style.borderColor = '';
		});
	});

	// Обробка відправки форми
	form.addEventListener('submit', function(e) {
		e.preventDefault();

		// Очищення попередніх помилок
		document.querySelectorAll('.error-message').forEach(error => {
			error.style.display = 'none';
		});
		document.querySelectorAll('.form-control').forEach(input => {
			input.style.borderColor = '';
		});

		// Disable кнопки під час відправки
		submitButton.disabled = true;
		submitButton.textContent = 'Sending...';

		// Збираємо дані форми
		const formData = {
			name: document.getElementById('name').value,
			email: document.getElementById('email').value,
			text: document.getElementById('text').value
		};

		// AJAX запит
		fetch('/contact', { // Замість '/contact' підстав свій роут
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				//'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
			},
			body: JSON.stringify(formData)
		})
		.then(response => {
			if (!response.ok) {
				return response.json().then(err => Promise.reject(err));
			}
			return response.json();
		})
		.then(data => {
			console.log('Success:', data);
			
			// Очищення форми після успішної відправки
			form.reset();
			
			// Тут додай свій код для показу нотіфікейшина
			Toastify({
				text: "Your message has been sent successfully.",
				duration: 3000,
				newWindow: true,
				close: true,
				gravity: "bottom", // `top` or `bottom`
				position: "center", // `left`, `center` or `right`
				stopOnFocus: true, // Prevents dismissing of toast on hover
				style: {
					background: "linear-gradient(to right, #00b09b, #96c93d)",
				},
				onClick: function(){} // Callback after click
			}).showToast();
		})
		.catch(error => {
			console.error('Error:', error);
			
			// Обробка помилок валідації від Laravel
			if (error.errors) {
				Object.keys(error.errors).forEach(fieldName => {
					const errorElement = document.getElementById(`error-${fieldName}`);
					const inputElement = document.getElementById(fieldName);
					
					if (errorElement && inputElement) {
						errorElement.textContent = error.errors[fieldName][0];
						errorElement.style.display = 'block';
						inputElement.style.borderColor = 'red';
					}
				});
			} else {
				// Тут додай код для показу загальної помилки
				// showNotification('error', 'Помилка відправки. Спробуйте ще раз.');
			}
		})
		.finally(() => {
			// Увімкнути кнопку назад
			submitButton.disabled = false;
			submitButton.textContent = 'Send message';
		});
	});
});