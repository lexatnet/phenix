{% extends '../../../layout.swig' %}

{% block content %}
  {% with context['taxonomyTermUpdateForm'] as context %}
  {% include "updateForm.swig" %}
  {% endwith %}
{% endblock %}

{% block script %}
  <script src="/javascripts/taxonomyTerm-update.js"></script>
{% endblock %}
