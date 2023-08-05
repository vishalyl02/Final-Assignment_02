// frontend/src/components/Pricing.js
import React, { useState } from 'react';
import axios from 'axios';

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState('');

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };
  const handleSubscribe = async () => {
    try {
      const response = await axios.post(`/subscribe/${selectedPlan}`);
      alert(response.data.message);
    } catch (error) {
      alert('Failed to subscribe.');
    }
  };
  return (
    <div>
      <h2>Choose a Subscription Plan</h2>
      <div>
        <input
          type="radio"
          name="plan"
          value="3"
          checked={selectedPlan === '3'}
          onChange={() => handlePlanSelect('3')}
        />
        <label>3 posts per day - $3</label>
      </div>
      <div>
        <input
          type="radio"
          name="plan"
          value="5"
          checked={selectedPlan === '5'}
          onChange={() => handlePlanSelect('5')}
        />
        <label>5 posts per day - $5</label>
      </div>
      <div>
        <input
          type="radio"
          name="plan"
          value="10"
          checked={selectedPlan === '10'}
          onChange={() => handlePlanSelect('10')}
        />
        <label>10 posts per day - $10</label>
      </div>
      <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  );
};

export default Pricing;
