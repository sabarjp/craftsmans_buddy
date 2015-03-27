Router.route('/', function(){
    this.render('home');
});

Router.route('/projects', function(){
    this.render('projects');
});

Router.route('/customers', function(){
    this.render('customersMain');
});
