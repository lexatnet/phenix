{% extends '../../../layout.swig' %}

{% block content %}
  {% if context['taxonomyVocabularyTermList'].taxonomyTerms %}
    {% with context['taxonomyVocabularyTermList'].taxonomyTerms as taxonomyTerms %}
      {% if taxonomyTerms.length > 0 %}
        <ul>
          {% for key, taxonomyTerm in taxonomyTerms %}
            <li>
              <a href="/administration/taxonomy/term/{{ taxonomyTerm.id }}/update">{{ taxonomyTerm.title }}</a>
              <a href="/administration/taxonomy/term/{{ taxonomyTerm.id }}/delete/">{{ 'Delete'|i18n }}</a>
            </li>
          {% endfor %}
        </ul>
      {% endif %}
    {% endwith %}
  {% endif %}
{% endblock %}
