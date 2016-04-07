{% extends '../../../layout.swig' %}

{% block content %}
  {% with context['taxonomyTermDeleteForm'] as context %}
  {% include "deleteForm.swig" %}
  {% endwith %}
{% endblock %}

{% block script %}
  <script src="/javascripts/taxonomyTerm-delete.js"></script>
{% endblock %}
