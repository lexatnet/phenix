{% extends '../../../layout.swig' %}

{% block content %}
  {% if context['taxonomyVocabularyList'].taxonomyVocabulaies %}
    {% with context['taxonomyVocabularyList'].taxonomyVocabulaies as taxonomyVocabulaies %}
      {% if taxonomyVocabulaies.length > 0 %}
        <ul>
          {% for key, taxonomyVocabulary in taxonomyVocabulaies %}
            <li>
              <a href="/administration/taxonomy/vocabulary/{{ taxonomyVocabulary.id }}/update">{{ taxonomyVocabulary.title }}</a>
              <a href="/administration/taxonomy/vocabulary/{{ taxonomyVocabulary.id }}/terms">{{ 'Terms'|i18n }}</a>
              <a href="/administration/taxonomy/vocabulary/{{ taxonomyVocabulary.id }}/delete">{{ 'Delete'|i18n }}</a>
            </li>
          {% endfor %}
        </ul>
      {% endif %}
    {% endwith %}
  {% endif %}
{% endblock %}
