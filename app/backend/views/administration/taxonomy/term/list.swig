{% extends '../../../layout.swig' %}

{% block content %}
  {% if context['taxonomyTermList'].taxonomyTerms %}
    {% with context['taxonomyTermList'].taxonomyTerms as taxonomyTerms %}
      {% if taxonomyTerms.length > 0 %}
        <ul>
          {% for key, taxonomyTerm in taxonomyTerms %}
            <li><a href="/administration/taxonomy/term/{{ taxonomyTerm.id }}/update">{{ taxonomyTerm.title }}</a></li>
          {% endfor %}
        </ul>
      {% endif %}
    {% endwith %}
  {% endif %}
{% endblock %}
