var SubmitBun = Class.create({
  initialize: function(input, options) {
    this.input = input;
    
    if(options)
      this.options = options;
    else
      eval('this.options = ' + input.className.substr(SubmitBun.CLASS_TEXT.length));

    this.form = this.input.up('form');
  },

  replace: function() {
    var hiddenInput = new Element('input', {
      'type': 'hidden',
      'value': this.input.getValue(),
      'name': this.input.name
    });
    this.input.replace(hiddenInput);
    this.input = hiddenInput;

    this.link = new Element('a', {
      'class': 'submit-bun-link',
      'href': '#'
    });

    this.link.observe('click', this.submit.bindAsEventListener(this));
    this.link.observe('mouseover', this.over.bindAsEventListener(this));
    this.link.observe('mouseout', this.out.bindAsEventListener(this));

    this.image = new Element('img', {
      'src': this.options.src,
      'border': 0,
      'class': 'submit-bun-image'
    });

    this.input.insert({before: this.link});
    this.link.insert(this.image);

    var preload = new Element('img', {
      'src': this.options.over,
      'border': 0,
      'width': 1,
      'height': 1,
      'style': 'display: none'
    })

    this.link.insert(preload);
  },
	
  submit: function() {
    if(this.form.onsubmit)
      if(this.form.onsubmit() == false) return;
    this.form.submit();
  },
	
  over: function() {
    this.image.src = this.options.over;
  },
	
  out: function() {
    this.image.src = this.options.src;
  }
});

SubmitBun.CLASS_TEXT = 'submit-bun';

subms = [];

function loadSubmitm() {
  $$('input').each(function(input) {
    if(input.className.substr(0, SubmitBun.CLASS_TEXT.length) == SubmitBun.CLASS_TEXT) {
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