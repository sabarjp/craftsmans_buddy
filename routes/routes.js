Router.route('/', function(){
    this.render('home');
});

Router.route('/home', function(){
    this.render('home');
});

Router.route('/projects', function(){
    this.render('projects');
});

Router.route('/customers', function(){
    this.render('customersMain');
});

Router.route('/login', function(){
    this.render('login');
});

Router.route('/signup', function(){
    this.render('signup');
});

Router.route('/password', function(){
    this.render('passwordRecovery');
});