import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export const useProfile = () => {
  const { user, setUser } = useAuth()
  
  const [profileData, setProfileData] = useState(() => {
    try {
      const saved = localStorage.getItem('career_profile_data')
      return saved ? JSON.parse(saved) : {
        username: user?.username || user?.name || 'PRIYANSHU KUMAR',
        email: user?.email || 'priyanshu@example.com',
        phone: '+91 98765 43210',
        location: 'New Delhi, India',
        jobTitle: 'Full Stack Software Engineer',
        experienceLevel: 'Mid-Senior (3-5 Years)',
        targetSalary: '₹18,000,000 / Year ($220K USD)',
        skills: 'React, Node.js, Express, MongoDB, Python, TypeScript, Docker, TailwindCSS',
        github: 'https://github.com/kaku-coder',
        linkedin: 'https://linkedin.com/in/priyanshu-kumar',
        avatar: user?.avatar || user?.profilePic || user?.picture || ''
      }
    } catch {
      return {
        username: 'PRIYANSHU KUMAR',
        email: 'priyanshu@example.com',
        phone: '+91 98765 43210',
        location: 'New Delhi, India',
        jobTitle: 'Full Stack Software Engineer',
        experienceLevel: 'Mid-Senior (3-5 Years)',
        targetSalary: '₹18,000,000 / Year ($220K USD)',
        skills: 'React, Node.js, Express, MongoDB, Python, TypeScript, Docker, TailwindCSS',
        github: 'https://github.com/kaku-coder',
        linkedin: 'https://linkedin.com/in/priyanshu-kumar',
        avatar: ''
      }
    }
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Sync profile data if user changes
  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        username: user.username || user.name || prev.username,
        email: user.email || prev.email,
        avatar: user.avatar || user.profilePic || prev.avatar
      }))
    }
  }, [user])

  // Save profile to localStorage & update auth context
  const updateProfile = async (updatedFields) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const newProfile = { ...profileData, ...updatedFields }
      setProfileData(newProfile)
      localStorage.setItem('career_profile_data', JSON.stringify(newProfile))
      
      if (setUser && user) {
        setUser({
          ...user,
          username: newProfile.username,
          avatar: newProfile.avatar
        })
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      return { success: true }
    } catch (err) {
      setError(err.message || 'Failed to update profile.')
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Handle avatar upload
  const uploadAvatar = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) return reject('No file provided')
      
      const reader = new FileReader()
      reader.onloadend = () => {
        const avatarUrl = reader.result
        updateProfile({ avatar: avatarUrl })
        resolve(avatarUrl)
      }
      reader.onerror = () => reject('Failed to read image file')
      reader.readAsDataURL(file)
    })
  }

  return {
    profileData,
    setProfileData,
    updateProfile,
    uploadAvatar,
    loading,
    error,
    success
  }
}

export default useProfile
