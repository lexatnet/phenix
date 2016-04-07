{% extends '../../layout.swig' %}

{% block content %}
  {% with context['roleCreateForm'] as context %}
  {% include "createForm.swig" %}
  {% endwith %}
{% endblock %}

{% block script %}
  <script src="/javascripts/role-create.js"></script>
{% endblock %}
