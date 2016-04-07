{% extends '../../layout.swig' %}

{% block content %}
  {% with context['roleUpdateForm'] as context %}
  {% include "updateForm.swig" %}
  {% endwith %}
{% endblock %}

{% block script %}
  <script src="/javascripts/role-update.js"></script>
{% endblock %}
