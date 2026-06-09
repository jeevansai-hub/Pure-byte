/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, Product, Ingredient, UserProfile, NotificationItem } from './types';
import { MOCK_PRODUCTS, MOCK_INGREDIENTS, MOCK_NOTIFICATIONS } from './data/mockData';

// Subcomponents
import BackgroundLayer from './components/BackgroundLayer';
import Navbar from './components/Navbar';
import NotificationCenter from './components/NotificationCenter';

// Pages
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import ScanPage from './components/ScanPage';
import OCRReview from './components/OCRReview';
import AnalysisLoading from './components/AnalysisLoading';
import SafetyReport from './components/SafetyReport';
import IngredientDetails from './components/IngredientDetails';
import DiseaseIntelligence from './components/DiseaseIntelligence';
import ScanHistory from './components/ScanHistory';
import ProductLibrary from './components/ProductLibrary';
import HealthProfile from './components/HealthProfile';
import AIChat from './components/AIChat';
import Subscription from './components/Subscription';
import AdminConsole from './components/AdminConsole';
import Settings from './components/Settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [ingredients, setIngredients] = useState<Ingredient[]>(MOCK_INGREDIENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  // Calibration contexts
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: 26,
    gender: 'female',
    allergies: ['Gluten', 'Lactose / Dairy'],
    healthConditions: ['Skin Eczema / Psoriasis'],
    dietPreferences: ['100% Organic Targeted'],
    pregnancyStatus: false,
    lifestyleGoals: ['Filter Synthetic Food Dyes', 'Evade Cosmetic Carcinogens'],
    riskCalibration: 'strict'
  });

  // Flow State parameters
  const [currentRawText, setCurrentRawText] = useState('');
  const [activeScannedProduct, setActiveScannedProduct] = useState<Product | null>(null);
  const [activeSelectedIngredient, setActiveSelectedIngredient] = useState<Ingredient | null>(null);

  // Notification Feed Actions
  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Scanner workflow commits
  const handleOCRReviewNeeded = (text: string, context: Product) => {
    setCurrentRawText(text);
    setActiveScannedProduct(context);
    setCurrentPage('ocr-review');
  };

  const handleCommitOCRText = (editedText: string) => {
    setCurrentRawText(editedText);
    setCurrentPage('loading');
  };

  const handleAnalysisFinish = () => {
    if (activeScannedProduct) {
      // Direct user straight to Safety report visualizer!
      setCurrentPage('report');
    } else {
      setCurrentPage('dashboard');
    }
  };

  // Safe quick simulation selector from Landing Demo
  const handleQuickSimulateProduct = (productId: string) => {
    const matched = products.find(p => p.id === productId);
    if (matched) {
      // Mark it as scanned dynamically
      const updated = products.map(p => p.id === productId ? { ...p, scanned: true } : p);
      setProducts(updated);
      setActiveScannedProduct(matched);
      setCurrentPage('report');
    }
  };

  // Nav actions
  const handleSelectProduct = (product: Product) => {
    setActiveScannedProduct(product);
    setCurrentPage('report');
  };

  const handleSelectIngredient = (ing: Ingredient) => {
    setActiveSelectedIngredient(ing);
    setCurrentPage('ingredient-details');
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans flex flex-col justify-between">
      {/* Immersive cinematic background */}
      <BackgroundLayer />

      {/* Futuristic centered header floating bar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onRequestOpenNotifications={() => setNotificationsOpen(true)}
        unreadNotificationsCount={unreadCount}
      />

      {/* Main viewport switcher */}
      <main className="flex-1 w-full pb-32">
        {currentPage === 'landing' && (
          <LandingPage 
            setCurrentPage={setCurrentPage} 
            onQuickSimulate={handleQuickSimulateProduct}
          />
        )}

        {currentPage === 'auth' && (
          <AuthPage 
            setCurrentPage={setCurrentPage} 
            onLoginSuccess={(email) => {
              setCurrentUserEmail(email);
              // Direct user to onboarding immediately on first login experience
            }}
          />
        )}

        {currentPage === 'onboarding' && (
          <Onboarding 
            setCurrentPage={setCurrentPage} 
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        )}

        {currentPage === 'dashboard' && (
          <Dashboard 
            setCurrentPage={setCurrentPage} 
            products={products}
            userProfile={userProfile}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'scan' && (
          <ScanPage 
            setCurrentPage={setCurrentPage} 
            products={products}
            setProducts={setProducts}
            onOCRReviewNeeded={handleOCRReviewNeeded}
          />
        )}

        {currentPage === 'ocr-review' && activeScannedProduct && (
          <OCRReview 
            setCurrentPage={setCurrentPage} 
            rawIngredientsText={currentRawText} 
            selectedProductContext={activeScannedProduct}
            onCommitReview={handleCommitOCRText}
          />
        )}

        {currentPage === 'loading' && (
          <AnalysisLoading 
            setCurrentPage={setCurrentPage} 
            onAnalysisFinish={handleAnalysisFinish}
          />
        )}

        {currentPage === 'report' && activeScannedProduct && (
          <SafetyReport 
            setCurrentPage={setCurrentPage} 
            product={activeScannedProduct}
            onSelectIngredient={handleSelectIngredient}
          />
        )}

        {currentPage === 'ingredient-details' && activeSelectedIngredient && (
          <IngredientDetails 
            setCurrentPage={setCurrentPage} 
            ingredient={activeSelectedIngredient}
          />
        )}

        {currentPage === 'disease-intel' && (
          <DiseaseIntelligence 
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'history' && (
          <ScanHistory 
            setCurrentPage={setCurrentPage}
            products={products}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'library' && (
          <ProductLibrary 
            setCurrentPage={setCurrentPage}
            products={products}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'profile' && (
          <HealthProfile 
            setCurrentPage={setCurrentPage}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        )}

        {currentPage === 'chat' && (
          <AIChat 
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'pricing' && (
          <Subscription 
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'admin' && (
          <AdminConsole 
            setCurrentPage={setCurrentPage}
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
        )}

        {currentPage === 'settings' && (
          <Settings 
            setCurrentPage={setCurrentPage}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        )}
      </main>

      {/* Sliding slide drawers */}
      <NotificationCenter
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsAsRead}
        onDeleteNotification={handleDeleteNotification}
      />
    </div>
  );
}
