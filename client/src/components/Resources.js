import React, { useState, useEffect, useCallback } from 'react';
import { PlusIcon, BookOpenIcon, LinkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '../LanguageContext';

const Resources = ({ showToast }) => {
  const { t } = useTranslation();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    category: '',
    url: '',
    author: '',
    content: ''
  });

  const fetchResources = useCallback(async () => {
    try {
      const response = await fetch('/api/resources');
      if (response.ok) {
        const data = await response.json();
        setResources(data);
      }
    } catch (error) {
      showToast('Failed to load resources', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showToast('Resource added successfully!');
        resetForm();
        fetchResources();
      } else {
        const error = await response.json();
        showToast(error.error || 'Failed to add resource', 'error');
      }
    } catch (error) {
      showToast('Network error occurred', 'error');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: '',
      category: '',
      url: '',
      author: '',
      content: ''
    });
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getTypeIcon = (type) => {
    const icons = {
      Article: '📄',
      Video: '🎥',
      Guide: '📚',
      Tool: '🛠️'
    };
    return icons[type] || '📄';
  };

  const getTypeColor = (type) => {
    const colors = {
      Article: 'from-blue-400 to-blue-500',
      Video: 'from-red-400 to-red-500',
      Guide: 'from-green-400 to-green-500',
      Tool: 'from-purple-400 to-purple-500'
    };
    return colors[type] || 'from-gray-400 to-gray-500';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Farming Techniques': 'bg-green-100 text-green-800',
      'Pest Control': 'bg-red-100 text-red-800',
      'Soil Management': 'bg-yellow-100 text-yellow-800',
      'Irrigation': 'bg-blue-100 text-blue-800',
      'Marketing': 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="animate-fade-in flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">Agricultural Resources</h1>
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Educational content and tools for farmers</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Resource</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">Add New Resource</h2>
            <button
              onClick={resetForm}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="select-field"
                required
              >
                <option value="">Select type</option>
                <option value="Article">Article</option>
                <option value="Video">Video</option>
                <option value="Guide">Guide</option>
                <option value="Tool">Tool</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="select-field"
                required
              >
                <option value="">Select category</option>
                <option value="Farming Techniques">Farming Techniques</option>
                <option value="Pest Control">Pest Control</option>
                <option value="Soil Management">Soil Management</option>
                <option value="Irrigation">Irrigation</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">URL</label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                className="input-field"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="3"
                className="input-field"
                placeholder="Brief description of the resource"
              />
            </div>

            <div className="md:col-span-2">
              <button type="submit" className="btn-primary">
                Add Resource
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="ml-3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <BookOpenIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4 transition-colors duration-300" />
            <p className="text-gray-500 dark:text-gray-400 transition-colors duration-300">No resources available yet.</p>
          </div>
        ) : (
          resources.map((resource) => (
            <div key={resource._id} className="card p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(resource.type)} rounded-full flex items-center justify-center`}>
                    <span className="text-white text-lg">{getTypeIcon(resource.type)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 transition-colors duration-300">{resource.title}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
                      {resource.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Type:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300">{resource.type}</span>
                </div>

                {resource.author && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Author:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300">{resource.author}</span>
                  </div>
                )}

                {resource.content && (
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 transition-colors duration-300">{resource.content}</p>
                  </div>
                )}

                {resource.url && (
                  <div className="pt-3">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors duration-300"
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span>View Resource</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Resources;
