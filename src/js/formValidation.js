// Form validation and submission handler
export class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.setup();
  }

  setup() {
    if (!this.form) return;
    
    this.form.setAttribute('novalidate', true);
    this.setupValidation();
    this.setupSubmission();
  }

  setupValidation() {
    const inputs = this.form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Add validation classes
      input.addEventListener('blur', () => {
        this.validateField(input);
      });

      // Real-time validation for text input
      if (input.type === 'text' || input.type === 'email') {
        input.addEventListener('input', () => {
          this.validateField(input);
        });
      }
    });
  }

  validateField(field) {
    const isValid = field.checkValidity();
    const errorElement = this.getErrorElement(field);

    if (!isValid) {
      field.classList.add('is-invalid');
      if (errorElement) {
        errorElement.textContent = this.getErrorMessage(field);
      }
    } else {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
      if (errorElement) {
        errorElement.textContent = '';
      }
    }

    return isValid;
  }

  getErrorElement(field) {
    return this.form.querySelector(`[data-error-for="${field.id}"]`);
  }

  getErrorMessage(field) {
    if (field.validity.valueMissing) {
      return 'This field is required';
    }
    if (field.validity.typeMismatch) {
      switch(field.type) {
        case 'email':
          return 'Please enter a valid email address';
        default:
          return 'Please enter a valid value';
      }
    }
    if (field.validity.tooShort) {
      return `Please enter at least ${field.minLength} characters`;
    }
    return field.validationMessage;
  }

  setupSubmission() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate all fields
      const inputs = this.form.querySelectorAll('input, textarea, select');
      let isValid = true;

      inputs.forEach(input => {
        if (!this.validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        return;
      }

      try {
        await this.submitForm();
      } catch (error) {
        this.showError('An error occurred. Please try again.');
      }
    });
  }

  async submitForm() {
    const formData = new FormData(this.form);
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

    const response = await fetch(this.form.action, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': csrfToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData))
    });

    if (!response.ok) {
      throw new Error('Form submission failed');
    }

    this.showSuccess('Thank you! Your message has been sent.');
    this.form.reset();
  }

  showSuccess(message) {
    const alert = this.form.querySelector('.alert-success');
    if (alert) {
      alert.textContent = message;
      alert.classList.remove('d-none');
      setTimeout(() => alert.classList.add('d-none'), 5000);
    }
  }

  showError(message) {
    const alert = this.form.querySelector('.alert-danger');
    if (alert) {
      alert.textContent = message;
      alert.classList.remove('d-none');
      setTimeout(() => alert.classList.add('d-none'), 5000);
    }
  }
}

// Initialize forms
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form[data-validate]');
  forms.forEach(form => new FormValidator(form.id));
});