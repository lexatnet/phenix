{% extends '../../layout.swig' %}

{% block content %}
  {% with context['userCreateForm'] as context %}
  {% include "createForm.swig" %}
  {% endwith %}
{% endblock %}

{% block script %}
  <script src="/javascripts/user-create.js"></script>
{% endblock %}
