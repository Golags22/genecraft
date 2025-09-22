import { useState } from "react";
import { db } from "../../../database/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Posting() {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    originalPrice: "",
    duration: "",
    difficulty: "Beginner",
    instructor: {
      title: "Mr.",
      name: "",
      numbersofcourses: 0,
      avatar: "",
    },
    image: "",
    learningOutcomes: [""],
    curriculum: [
      {
        sectionTitle: "",
        lessons: [
          {
            id: 1,
            title: "",
            duration: ""
          }
        ]
      }
    ]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleInstructorChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      instructor: { ...courseData.instructor, [name]: value },
    });
  };

  const handleLearningOutcomeChange = (index, value) => {
    const updatedOutcomes = [...courseData.learningOutcomes];
    updatedOutcomes[index] = value;
    setCourseData({ ...courseData, learningOutcomes: updatedOutcomes });
  };

  const addLearningOutcome = () => {
    setCourseData({
      ...courseData,
      learningOutcomes: [...courseData.learningOutcomes, ""],
    });
  };

  const removeLearningOutcome = (index) => {
    const updatedOutcomes = courseData.learningOutcomes.filter((_, i) => i !== index);
    setCourseData({ ...courseData, learningOutcomes: updatedOutcomes });
  };

  const handleCurriculumSectionChange = (sectionIndex, field, value) => {
    const updatedCurriculum = [...courseData.curriculum];
    updatedCurriculum[sectionIndex][field] = value;
    setCourseData({ ...courseData, curriculum: updatedCurriculum });
  };

  const handleLessonChange = (sectionIndex, lessonIndex, field, value) => {
    const updatedCurriculum = [...courseData.curriculum];
    updatedCurriculum[sectionIndex].lessons[lessonIndex][field] = value;
    setCourseData({ ...courseData, curriculum: updatedCurriculum });
  };

  const addCurriculumSection = () => {
    setCourseData({
      ...courseData,
      curriculum: [
        ...courseData.curriculum,
        {
          sectionTitle: "",
          lessons: [
            {
              id: courseData.curriculum.reduce((max, section) => 
                Math.max(max, ...section.lessons.map(l => l.id)), 0) + 1,
              title: "",
              duration: ""
            }
          ]
        }
      ]
    });
  };

  const addLesson = (sectionIndex) => {
    const updatedCurriculum = [...courseData.curriculum];
    const newLessonId = updatedCurriculum.reduce((max, section) => 
      Math.max(max, ...section.lessons.map(l => l.id)), 0) + 1;
    
    updatedCurriculum[sectionIndex].lessons.push({
      id: newLessonId,
      title: "",
      duration: ""
    });
    
    setCourseData({ ...courseData, curriculum: updatedCurriculum });
  };

  const removeSection = (sectionIndex) => {
    if (courseData.curriculum.length > 1) {
      const updatedCurriculum = courseData.curriculum.filter((_, i) => i !== sectionIndex);
      setCourseData({ ...courseData, curriculum: updatedCurriculum });
    }
  };

  const removeLesson = (sectionIndex, lessonIndex) => {
    const updatedCurriculum = [...courseData.curriculum];
    if (updatedCurriculum[sectionIndex].lessons.length > 1) {
      updatedCurriculum[sectionIndex].lessons = updatedCurriculum[sectionIndex].lessons.filter((_, i) => i !== lessonIndex);
      setCourseData({ ...courseData, curriculum: updatedCurriculum });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const id = Date.now().toString();
      await setDoc(doc(db, "courses", id), {
        ...courseData,
        id,
        rating: 0,
        reviews: 0,
        students: 0,
        updatedDate: new Date().getFullYear(),
        createdAt: new Date().toISOString(),
      });

      toast.success("🎉 Course posted successfully!");
      
      // Reset form
      setCourseData({
        title: "",
        description: "",
        category: "",
        price: "",
        originalPrice: "",
        duration: "",
        difficulty: "Beginner",
        instructor: {
          title: "Mr.",
          name: "",
          numbersofcourses: 0,
          avatar: "",
        },
        image: "",
        learningOutcomes: [""],
        curriculum: [
          {
            sectionTitle: "",
            lessons: [
              {
                id: 1,
                title: "",
                duration: ""
              }
            ]
          }
        ]
      });
      
    } catch (err) {
      toast.error("❌ Failed to post course: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    "Technology", "Business", "Design", "Marketing", 
    "Development", "Data Science", "Photography", "Music", "Med"
  ];

  const difficulties = ["Beginner", "Intermediate", "Advanced"];
  const instructorTitles = ["Mr.", "Ms.", "Mrs.", "Dr.", "Prof."];

  const sections = [
    { id: "basic", label: "Basic Info", icon: "📝" },
    { id: "pricing", label: "Pricing", icon: "💰" },
    { id: "instructor", label: "Instructor", icon: "👤" },
    { id: "content", label: "Content", icon: "🎯" },
    { id: "curriculum", label: "Curriculum", icon: "📚" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
< button className="mb-6 text-blue-600 hover:text-blue-800" onClick={() => window.history.back()} >← Back to Dashboard</button> 
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Course</h1>
          <p className="text-gray-600">Fill in the details to publish your course</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Progress Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium transition-all duration-200 ${
                    activeSection === section.id
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-2 text-lg">{section.icon}</span>
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information Section */}
            {activeSection === "basic" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={courseData.title}
                      onChange={handleChange}
                      placeholder="e.g., Data Science Fundamentals"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={courseData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={courseData.description}
                    onChange={handleChange}
                    placeholder="Describe what students will learn in this course..."
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration *
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={courseData.duration}
                      onChange={handleChange}
                      placeholder="e.g., 2:00 hr"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level *
                    </label>
                    <select
                      name="difficulty"
                      value={courseData.difficulty}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      {difficulties.map((diff) => (
                        <option key={diff} value={diff}>{diff}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Image URL *
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={courseData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>
            )}

            {/* Pricing Section */}
            {activeSection === "pricing" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Price ($) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={courseData.price}
                      onChange={handleChange}
                      placeholder="59.99"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price ($)
                    </label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={courseData.originalPrice}
                      onChange={handleChange}
                      placeholder="50.00"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {courseData.originalPrice && courseData.price && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <span className="text-blue-600 text-sm">
                        🎉 Students will save ${(courseData.originalPrice - courseData.price).toFixed(2)} (
                        {Math.round((1 - courseData.price / courseData.originalPrice) * 100)}% discount)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Instructor Section */}
            {activeSection === "instructor" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <select
                      name="title"
                      value={courseData.instructor.title}
                      onChange={handleInstructorChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      {instructorTitles.map((title) => (
                        <option key={title} value={title}>{title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instructor Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={courseData.instructor.name}
                      onChange={handleInstructorChange}
                      placeholder="e.g., Ben"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Courses
                    </label>
                    <input
                      type="number"
                      name="numbersofcourses"
                      value={courseData.instructor.numbersofcourses}
                      onChange={handleInstructorChange}
                      placeholder="2"
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Avatar URL
                    </label>
                    <input
                      type="url"
                      name="avatar"
                      value={courseData.instructor.avatar}
                      onChange={handleInstructorChange}
                      placeholder="https://example.com/avatar.jpg"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Content Section */}
            {activeSection === "content" && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Learning Outcomes *
                  </label>
                  <div className="space-y-3">
                    {courseData.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={outcome}
                          onChange={(e) => handleLearningOutcomeChange(index, e.target.value)}
                          placeholder="e.g., Analyse and clean large datasets using Python libraries."
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                        {courseData.learningOutcomes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLearningOutcome(index)}
                            className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addLearningOutcome}
                    className="mt-3 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">+</span>
                    Add Another Outcome
                  </button>
                </div>
              </div>
            )}

            {/* Curriculum Section */}
            {activeSection === "curriculum" && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Course Curriculum *
                  </label>
                  <div className="space-y-4">
                    {courseData.curriculum.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium text-gray-800">Section {sectionIndex + 1}</h3>
                          {courseData.curriculum.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSection(sectionIndex)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove Section
                            </button>
                          )}
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section Title *
                          </label>
                          <input
                            type="text"
                            value={section.sectionTitle}
                            onChange={(e) => handleCurriculumSectionChange(sectionIndex, 'sectionTitle', e.target.value)}
                            placeholder="e.g., Introduction to Data Science"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lessons *
                          </label>
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson.id} className="flex items-center space-x-2">
                              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  value={lesson.title}
                                  onChange={(e) => handleLessonChange(sectionIndex, lessonIndex, 'title', e.target.value)}
                                  placeholder="Lesson title"
                                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  required
                                />
                                <input
                                  type="text"
                                  value={lesson.duration}
                                  onChange={(e) => handleLessonChange(sectionIndex, lessonIndex, 'duration', e.target.value)}
                                  placeholder="Duration (e.g., 15 min)"
                                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  required
                                />
                              </div>
                              {section.lessons.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeLesson(sectionIndex, lessonIndex)}
                                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addLesson(sectionIndex)}
                            className="mt-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                          >
                            + Add Lesson
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addCurriculumSection}
                    className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">+</span>
                    Add Another Section
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  const currentIndex = sections.findIndex(s => s.id === activeSection);
                  if (currentIndex > 0) {
                    setActiveSection(sections[currentIndex - 1].id);
                  }
                }}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                ← Previous
              </button>

              {activeSection === "curriculum" ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-500 text-white rounded-lg font-medium hover:from-green-700 hover:to-teal-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publishing...
                    </>
                  ) : (
                    "Publish Course"
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === activeSection);
                    if (currentIndex < sections.length - 1) {
                      setActiveSection(sections[currentIndex + 1].id);
                    }
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Next →
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}