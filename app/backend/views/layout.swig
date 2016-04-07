<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>{{ title }}</title>

    <!-- Bootstrap -->
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css">

    <!-- Custom stylesheet -->
    <link rel='stylesheet' href='/stylesheets/style.css' />



    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
    {% if isUserAuthenticated() %}
      {% include "./user/logoutForm.swig" %}
    {% endif %}


    {% block menu %}
    {% include 'menu.swig' %}
    {% endblock %}
    <div class="container">
        {% block content %}{% endblock %}
    </div>
    {% block footer %}
    {% include 'footer.swig' %}
    {% endblock %}
    <script src="/bower_components/angular/angular.js"></script>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <!-- Latest compiled and minified JavaScript Bootstrap -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="/javascripts/libs/swig/swig.js"></script>
    <script src="/javascripts/utils.js"></script>
    <script src="/javascripts/forms.js"></script>
    <script src="/javascripts/menu.js"></script>
    <script src="/javascripts/locale-set.js"></script>
    {% block script %}
    {% endblock %}
</body>
</html>
