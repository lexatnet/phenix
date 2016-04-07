{% extends '../../../layout.swig' %}

{% block content %}
  {% with context['taxonomyVocabularyUpdateForm'] as context %}
  {% include "updateForm.swig" %}
  {% endwith %}
{% endblock %}

{% block script %}
  <script src="/javascripts/taxonomyVocabulary-update.js"></script>
{% endblock %}
