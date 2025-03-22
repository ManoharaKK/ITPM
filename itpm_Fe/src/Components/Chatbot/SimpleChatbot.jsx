import React, { useState, useEffect, useRef } from 'react';
import './SimpleChatbot.css';

const SimpleChatbot = ({ onError }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Welcome to our laptop shop! I\'m your virtual assistant here to help find the perfect laptop for your needs.\n\nWhat is your budget for a new laptop?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState('budget');
  const [quickResponses, setQuickResponses] = useState([
    { text: 'Less than 200,000 LKR', value: '150000' },
    { text: '200,000 - 400,000 LKR', value: '300000' },
    { text: 'Above 400,000 LKR', value: '500000' }
  ]);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Update quick response buttons based on current step
    switch(currentStep) {
      case 'budget':
        setQuickResponses([
          { text: 'Less than 200,000 LKR', value: '150000' },
          { text: '200,000 - 400,000 LKR', value: '300000' },
          { text: 'Above 400,000 LKR', value: '500000' }
        ]);
        break;
      case 'usage':
        setQuickResponses([
          { text: 'Browse the web', value: 'browsing' },
          { text: 'Work on documents', value: 'documents' },
          { text: 'Watch videos', value: 'videos' },
          { text: 'Gaming', value: 'gaming' },
          { text: 'Software development', value: 'development' },
          { text: 'Graphic design', value: 'design' },
          { text: 'Other', value: 'other' }
        ]);
        break;
      case 'travel':
        setQuickResponses([
          { text: 'Yes, frequently', value: 'yes' },
          { text: 'Sometimes', value: 'sometimes' },
          { text: 'Rarely', value: 'no' }
        ]);
        break;
      case 'restart':
        setQuickResponses([
          { text: 'Start a new search', value: 'yes' },
          { text: 'No, thank you', value: 'no' }
        ]);
        break;
      default:
        setQuickResponses([]);
    }
  }, [currentStep]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const getLaptopRecommendations = (budget, usage, travel) => {
    budget = parseInt(budget.replace(/[^0-9]/g, ''));
    
    // Laptop recommendations with Sri Lankan prices
    let recommendations = [];
    
    if (budget <= 200000) {
      if (usage === 'browsing' || usage === 'documents' || usage === 'videos') {
        recommendations.push(
          "Asus VivoBook 15 - LKR 185,000 - Intel Core i3, 8GB RAM, 256GB SSD, 15.6\" FHD display",
          "Lenovo IdeaPad 3 - LKR 169,000 - Intel Core i3, 8GB RAM, 512GB SSD, 15.6\" FHD display",
          "Acer Aspire 3 - LKR 159,000 - Intel Core i3, 4GB RAM, 1TB HDD, 15.6\" HD display"
        );
      } else if (usage === 'gaming') {
        recommendations.push(
          "Acer Nitro 5 (Budget Model) - LKR 199,000 - Intel Core i5, 8GB RAM, 512GB SSD, GTX 1650, 15.6\" FHD display",
          "HP Pavilion Gaming - LKR 195,000 - AMD Ryzen 5, 8GB RAM, 512GB SSD, GTX 1650, 15.6\" FHD display"
        );
      } else if (usage === 'development' || usage === 'design' || usage === 'other') {
        recommendations.push(
          "Dell Inspiron 15 - LKR 188,000 - Intel Core i5, 8GB RAM, 512GB SSD, 15.6\" FHD display",
          "HP Pavilion 15 - LKR 192,000 - AMD Ryzen 5, 8GB RAM, 512GB SSD, 15.6\" FHD display",
          "Consider a higher budget for better performance with development or design work"
        );
      }
    } else if (budget <= 400000) {
      if (usage === 'browsing' || usage === 'documents' || usage === 'videos') {
        recommendations.push(
          "Dell XPS 13 - LKR 325,000 - Intel Core i5, 16GB RAM, 512GB SSD, 13.3\" FHD display",
          "ASUS ZenBook 14 - LKR 299,000 - Intel Core i7, 16GB RAM, 512GB SSD, 14\" FHD display",
          "Lenovo ThinkBook 14 - LKR 275,000 - Intel Core i5, 16GB RAM, 1TB SSD, 14\" FHD display"
        );
      } else if (usage === 'gaming') {
        recommendations.push(
          "ASUS TUF Gaming A15 - LKR 365,000 - AMD Ryzen 7, 16GB RAM, 512GB SSD, RTX 3050Ti, 15.6\" FHD 144Hz display",
          "MSI Katana GF66 - LKR 389,000 - Intel Core i7, 16GB RAM, 512GB SSD, RTX 3050Ti, 15.6\" FHD 144Hz display",
          "Acer Predator Helios 300 - LKR 395,000 - Intel Core i7, 16GB RAM, 512GB SSD, RTX 3060, 15.6\" FHD 144Hz display"
        );
      } else if (usage === 'development' || usage === 'design' || usage === 'other') {
        recommendations.push(
          "Lenovo ThinkPad E15 - LKR 315,000 - Intel Core i7, 16GB RAM, 512GB SSD, 15.6\" FHD display",
          "HP ENVY 15 - LKR 359,000 - Intel Core i7, 16GB RAM, 1TB SSD, GTX 1650Ti, 15.6\" FHD display",
          "ASUS ProArt StudioBook 15 - LKR 385,000 - Intel Core i7, 16GB RAM, 1TB SSD, GTX 1650, 15.6\" FHD display"
        );
      }
    } else {
      if (usage === 'browsing' || usage === 'documents' || usage === 'videos') {
        recommendations.push(
          "Apple MacBook Air M2 - LKR 425,000 - Apple M2 chip, 16GB RAM, 512GB SSD, 13.6\" Liquid Retina display",
          "Dell XPS 15 - LKR 495,000 - Intel Core i7, 32GB RAM, 1TB SSD, 15.6\" 4K OLED display",
          "Microsoft Surface Laptop 5 - LKR 450,000 - Intel Core i7, 16GB RAM, 512GB SSD, 13.5\" touchscreen display"
        );
      } else if (usage === 'gaming') {
        recommendations.push(
          "ASUS ROG Strix G15 - LKR 525,000 - AMD Ryzen 9, 32GB RAM, 1TB SSD, RTX 3070, 15.6\" FHD 300Hz display",
          "MSI GP66 Leopard - LKR 545,000 - Intel Core i7, 32GB RAM, 1TB SSD, RTX 3070Ti, 15.6\" QHD 165Hz display",
          "Alienware m15 R7 - LKR 650,000 - Intel Core i9, 32GB RAM, 1TB SSD, RTX 3080, 15.6\" QHD 240Hz display"
        );
      } else if (usage === 'development' || usage === 'design' || usage === 'other') {
        recommendations.push(
          "Apple MacBook Pro 16\" - LKR 725,000 - Apple M2 Pro chip, 32GB RAM, 1TB SSD, 16.2\" Liquid Retina XDR display",
          "Dell Precision 5560 - LKR 675,000 - Intel Core i9, 32GB RAM, 1TB SSD, RTX A2000, 15.6\" 4K display",
          "ASUS ProArt StudioBook Pro 16 - LKR 595,000 - Intel Xeon, 64GB RAM, 2TB SSD, RTX A3000, 16\" 4K OLED display"
        );
      }
    }
    
    // Factor in travel needs
    if (travel === 'yes' || travel === 'sometimes') {
      recommendations.push(
        "Since portability is important to you, consider these lightweight options:",
        "- LG Gram series - Ultra-lightweight with excellent battery life",
        "- Microsoft Surface Laptop - Compact, lightweight, and powerful",
        "- Apple MacBook Air - Thin, light with all-day battery life",
        "- ASUS ZenBook series - Compact with military-grade durability"
      );
    }
    
    return recommendations;
  };

  const handleQuickResponseClick = (value) => {
    setInput(value);
    
    // Simulate sending the message with a slight delay
    setTimeout(() => {
      processChatMessage(value);
    }, 100);
  };

  const processChatMessage = (messageText) => {
    // Add user message
    const userMessage = { type: 'user', text: messageText };
    setMessages(msgs => [...msgs, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Process based on current step
    setTimeout(() => {
      let botResponse;
      
      switch(currentStep) {
        case 'budget':
          let budgetAmount = parseInt(messageText.replace(/[^0-9]/g, '')) || 0;
          let budgetText = "";
          
          if (budgetAmount <= 200000) {
            budgetText = "less than 200,000 LKR";
          } else if (budgetAmount <= 400000) {
            budgetText = "between 200,000 and 400,000 LKR";
          } else {
            budgetText = "above 400,000 LKR";
          }
          
          botResponse = { 
            type: 'bot', 
            text: `Thank you! I've noted your budget of approximately ${budgetAmount.toLocaleString()} LKR (${budgetText}).\n\nWhat will you primarily use this laptop for? Please select from the options below:` 
          };
          setCurrentStep('usage');
          break;
          
        case 'usage':
          botResponse = { 
            type: 'bot', 
            text: `Great choice! Will you be traveling frequently with this laptop?` 
          };
          setCurrentStep('travel');
          break;
          
        case 'travel':
          // Get recommendations based on previous answers
          const previousMessages = messages.map(msg => msg.text);
          const budget = previousMessages[1]; // User's budget message
          const usage = previousMessages[3]; // User's usage message
          const travel = messageText; // Current input is about travel
          
          const recommendations = getLaptopRecommendations(budget, usage.toLowerCase(), travel.toLowerCase());
          
          // Join recommendations with line breaks
          botResponse = { 
            type: 'bot', 
            text: `Based on your requirements, here are my recommendations:\n\n${recommendations.join('\n\n')}\n\nWould you like to start over with a new laptop search?` 
          };
          setCurrentStep('restart');
          break;
          
        case 'restart':
          if (messageText.toLowerCase().includes('yes')) {
            botResponse = { 
              type: 'bot', 
              text: `Let's start a new search! What is your budget for a new laptop?` 
            };
            setCurrentStep('budget');
          } else {
            botResponse = { 
              type: 'bot', 
              text: `Thank you for using our laptop shopping assistant! If you have any other questions or need more information about our products, please visit our store or contact our customer service team. Have a great day!` 
            };
          }
          break;
          
        default:
          botResponse = { 
            type: 'bot', 
            text: `I'm not sure how to respond to that. Let's start over. What is your budget for a new laptop?` 
          };
          setCurrentStep('budget');
      }
      
      setMessages(msgs => [...msgs, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    processChatMessage(input);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <h3 style={{ fontSize: '1.1rem', whiteSpace: 'nowrap', overflow: 'visible' }}>Laptop Shop AI Assistant</h3>
      </div>
      <div className="chatbot-messages" id="chatbot-messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="message-content">
              {message.text.split('\n').map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message bot">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} style={{ float: "left", clear: "both", paddingBottom: "15px" }} />
      </div>
      {quickResponses.length > 0 && (
        <div className="quick-responses">
          {quickResponses.map((option, index) => (
            <button
              key={index}
              onClick={() => handleQuickResponseClick(option.value)}
              disabled={isTyping}
              className="quick-response-btn"
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={isTyping}
        />
        <button 
          onClick={handleSendMessage}
          disabled={isTyping || input.trim() === ''}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SimpleChatbot; 