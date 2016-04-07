{% extends '../../../layout.swig' %}

{% block content %}
  {% with context['taxonomyVocabularyDeleteForm'] as context %}
  {% include "deleteForm.swig" %}
  {% endwith %}
{% endblock %}

{% block script %}
  <script src="/javascripts/taxonomyVocabulary-delete.js"></script>
{% endblock %}
