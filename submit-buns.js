var SubmitBun = new Class({
    initialize: function(input) {
        this.input = input;
		eval('this.options = ' + input.className.substr(SubmitBun.CLASS_TEXT.length));
		this.form = this.input.getParent('form');
    },

	replace: function() {
		var hiddenInput = new Element('input', {
			'type': 'hidden',
			'value': this.input.getProperty('value'),
			'name': this.input.getProperty('name')
		}).replaces(this.input);
		
		this.input = hiddenInput;
		
		this.input.setProperty('type', 'hidden');
		this.link = new Element('a', {
			'class': 'submit-bun-link',
			'href': '#',
			'events': {
				'click': this.submit.bind(this),
				'mouseover': this.over.bind(this),
				'mouseout': this.out.bind(this)
			}
		});
		
		this.image = new Element('img', {
			'src': this.options.src,
			'border': 0,
			'class': 'submit-bun-image'
		});
		
		this.link.inject(this.input, 'after');
		this.image.inject(this.link);
		
		new Element('img', {
			'src': this.options.over,
			'border': 0,
			'width': 1,
			'height': 1,
			'styles': {
				'display': 'none'
			}
		}).inject(this.link);
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

window.addEvent('domready', function() {
//	loadSubmitm();
});

loadSubmitm();