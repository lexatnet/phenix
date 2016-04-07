{% extends '../../../layout.swig' %}

{% block content %}
  {% with context['taxonomyTermCreateForm'] as context %}
  {% include "createForm.swig" %}
  {% endwith %}
{% endblock %}

{% block script %}
  <script src="/javascripts/taxonomyTerm-create.js"></script>
{% endblock %}
