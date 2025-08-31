import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class User {
  final String email;
  final String role;
  final String? firstName;
  final String? lastName;
  final String? organization;

  User({
    required this.email,
    required this.role,
    this.firstName,
    this.lastName,
    this.organization,
  });

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'role': role,
      'firstName': firstName,
      'lastName': lastName,
      'organization': organization,
    };
  }

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      email: json['email'],
      role: json['role'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      organization: json['organization'],
    );
  }

  String get initials {
    return email.isNotEmpty ? email[0].toUpperCase() : 'U';
  }

  String get displayRole {
    return role.replaceAll('_', ' ').split(' ').map((word) => 
      word[0].toUpperCase() + word.substring(1)).join(' ');
  }
}

class AuthProvider extends ChangeNotifier {
  User? _user;
  bool _isLoading = true;

  User? get user => _user;
  bool get isLoading => _isLoading;
  bool get isAuthenticated => _user != null;

  AuthProvider() {
    _loadUser();
  }

  Future<void> _loadUser() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final userJson = prefs.getString('vet_insurance_user');
      if (userJson != null) {
        final userData = jsonDecode(userJson);
        _user = User.fromJson(userData);
      }
    } catch (e) {
      debugPrint('Error loading user: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> login(String email, String role) async {
    try {
      _user = User(email: email, role: role);
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('vet_insurance_user', jsonEncode(_user!.toJson()));
      notifyListeners();
    } catch (e) {
      debugPrint('Error during login: $e');
    }
  }

  Future<void> logout() async {
    try {
      _user = null;
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove('Safe Pastures Admin');
      notifyListeners();
    } catch (e) {
      debugPrint('Error during logout: $e');
    }
  }
}
