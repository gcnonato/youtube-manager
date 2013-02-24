var Job = Backbone.Model.extend({
	defaults: {
		url: '',
		status: 'notstarted'
	},
	idAttribute: '_id'
});

var Jobs = Backbone.Collection.extend({
	model: Job,
	url: '/jobs'
});

var JobView = Backbone.View.extend({
	tagName: 'li',

	jobTpl: _.template($('#job_template').html()),
	//jobTpl: _.template('<%= url %>'),

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.jobTpl(this.model.toJSON()));
		return this;
	}
});

var JobsView = Backbone.View.extend({
	el:$('#jobs'),

	initialize: function() {
		this.collection = new Jobs(jobs);
		this.collection = new Jobs();
		this.collection.fetch();
		this.render();

		this.collection.on('add', this.renderJob, this);
		this.collection.on('reset', this.render, this);
	},

	render: function() {
		var that = this;
		_.each(this.collection.models, function(item) {
			that.renderJob(item);
		}, this);
	},
	
	renderJob: function(job) {
		var jobView = new JobView({model: job});
		this.$el.append(jobView.render().el);
	},
	
	addJob : function(e) {
		e.preventDefault();
		
		var formData = {};
		
		$('#addJobForm').children('input').each(function(i, el){
			formData[el.id] = $(el).val();
		});

		jobs.push(formData);

		//this.collection.add(new Job(formData));
		this.collection.create(formData);
	},

	events: {
		'click #addButton': 'addJob'
	}
});

var jobs = [
		{url:'testurl1', status:'test status1'},
		{url:'testurl2', status:'test status2'}
]

/*
var job = new Job({url: 'xxxx', status: 'xstatus'});
var jobView = new JobView({model: job});
$('#jobs').html(jobView.render().el);
*/

var jobsView = new JobsView();

