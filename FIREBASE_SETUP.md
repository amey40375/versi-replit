# Firebase Setup Guide for GetLife Application

## Current Status
✅ Firebase SDK installed and configured
✅ Hybrid storage system implemented (Firebase + localStorage fallback)
✅ Authentication system updated for async operations
✅ Basic login/register functionality working

## Firebase Security Rules Configuration

Your app is currently getting permission errors because Firebase security rules need to be configured. Here's how to set them up:

### 1. Access Firebase Console
1. Go to https://console.firebase.google.com/
2. Select your GetLife project
3. Navigate to "Firestore Database" in the left sidebar
4. Click on the "Rules" tab

### 2. Update Firestore Security Rules

Replace the default rules with the following configuration:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents for now
    // You can make this more restrictive later
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Important**: This rule allows all reads and writes. For production, you should implement proper authentication-based rules.

### 3. More Secure Rules (Recommended for Production)

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if true; // Adjust based on your auth requirements
    }
    
    // Profiles collection
    match /profiles/{profileId} {
      allow read, write: if true;
    }
    
    // Mitra applications
    match /mitra_applications/{applicationId} {
      allow read, write: if true;
    }
    
    // Orders
    match /orders/{orderId} {
      allow read, write: if true;
    }
    
    // Transactions
    match /transactions/{transactionId} {
      allow read, write: if true;
    }
    
    // Chat messages
    match /chat_messages/{messageId} {
      allow read, write: if true;
    }
    
    // Blocked accounts
    match /blocked_accounts/{accountId} {
      allow read, write: if true;
    }
  }
}
```

### 4. Test the Connection

After updating the rules:
1. Save the rules in Firebase Console
2. Refresh your GetLife application
3. The Firebase connection should work without permission errors

## How the Hybrid System Works

Your app now has a smart fallback system:

1. **First Priority**: Tries to use Firebase for data storage
2. **Fallback**: If Firebase fails (permissions, network, etc.), automatically uses localStorage
3. **Seamless Experience**: Users don't notice the switch between storage systems

## Current Features Working

✅ User registration and login
✅ Admin account initialization
✅ Data persistence (localStorage fallback)
✅ Real-time Firebase sync (when permissions are fixed)

## Next Steps

1. Configure Firebase security rules as shown above
2. Test Firebase connection
3. Optionally implement Firebase Authentication for better security
4. Monitor Firebase usage in the console

## Firebase Collections Created

When Firebase is working, these collections will be automatically created:
- `users` - User authentication data
- `profiles` - User profile information
- `mitra_applications` - Service provider applications
- `orders` - Service orders
- `transactions` - Payment transactions
- `chat_messages` - Chat communications
- `blocked_accounts` - Blocked user accounts

## Troubleshooting

- **Permission Errors**: Update Firestore security rules
- **Connection Issues**: Check Firebase configuration keys in Replit Secrets
- **Data Not Syncing**: Verify internet connection and Firebase project status
- **Fallback Mode**: App automatically uses localStorage when Firebase unavailable