{% extends '../../layout.swig' %}

{% block content %}
  {% with context['userUpdateForm'] as context %}
  {% include "updateForm.swig" %}
  {% endwith %}
{% endblock %}

{% block script %}
  <script src="/javascripts/user-update.js"></script>
{% endblock %}
