{% extends '../../layout.swig' %}

{% block content %}
  {% with context['roleDeleteForm'] as context %}
  {% include "deleteForm.swig" %}
  {% endwith %}
{% endblock %}

{% block script %}
  <script src="/javascripts/role-delete.js"></script>
{% endblock %}
