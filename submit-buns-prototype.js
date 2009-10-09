var SubmitBun = Class.create({
  initialize: function(input, options) {
    this.input = input;
    
    if(options)
      this.options = options;
    else
      this.options = {};

    this.form = this.input.up('form');
  },

  replace: function() {
    var classes = this.input.className;
    var hiddenInput = new Element('input', {
      'type': 'hidden',
      'value': this.input.getValue(),
      'name': this.input.name
    });
    this.input.replace(hiddenInput);
    this.input = hiddenInput;

    this.link = new Element('a', {
      'href': '#'
    });
    this.link.removeClassName('submit-bun');
    this.link.className = 'submit-bun-link ' + classes;

    this.link.observe('click', this.submit.bindAsEventListener(this));

    this.image = new Element('img', {
      'src': this.options.src,
      'border': 0,
      'class': 'submit-bun-image'
    });

    this.input.insert({before: this.link});
    this.link.update(hiddenInput.getValue());
  },

  submit: function(event) {
    event.stop();

    this.link.insert(preload);
  },
	
  submit: function(event) {
    event.stop();

    if(this.form.onsubmit)
      if(this.form.onsubmit() == false) return;
    this.form.submit();
  }
});

SubmitBun.CLASS_TEXT = 'submit-bun';

subms = [];

function loadSubmitm() {
  $$('input').each(function(input) {
    if(input.hasClassName(SubmitBun.CLASS_TEXT)) {
      subms.push(new SubmitBun(input));
    }
  });
	
  subms.each(function(subm) {
    subm.replace();
  });
}

$(document).observe('dom:loaded', function() {
  loadSubmitm();
});