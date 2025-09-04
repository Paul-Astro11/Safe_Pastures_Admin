import 'package:flutter/material.dart';

class ApplicationsScreen extends StatefulWidget {
  const ApplicationsScreen({super.key});

  @override
  State<ApplicationsScreen> createState() => _ApplicationsScreenState();
}

class _ApplicationsScreenState extends State<ApplicationsScreen> {
  String selectedFilter = 'All';
  final List<String> filters = ['All', 'Pending', 'Approved', 'Rejected', 'Under Review'];

  final List<Map<String, dynamic>> applications = [
    {
      'id': 'APP-2025-001',
      'AnimalName': 'Cattle',
      'AnimalType': 'cow',
      'breed': 'Boran',
      'ownerName': 'Sarah Banda',
      'status': 'Pending',
      'submittedDate': '2025-10-15',
      'premium': '\R89.99',
    },
    {
      'id': 'APP-2025-002',
      'AnimalName': 'Pig',
      'AnimalType': 'Large White',
      'breed': 'Large White',
      'ownerName': 'Mike Chanda',
      'status': 'Approved',
      'submittedDate': '2025-10-14',
      'premium': '\R65.50',
    },
    {
      'id': 'APP-2025-003',
      'AnimalName': 'Goat',
      'AnimalType': 'Goat',
      'breed': 'Boer',
      'ownerName': 'Emma Davis',
      'status': 'Under Review',
      'submittedDate': '2025-10-13',
      'premium': '\R75.25',
    },
    {
      'id': 'APP-2025-004',
      'AnimalName': 'Sheep',
      'AnimalType': 'Sheep',
      'breed': 'Dorper',
      'ownerName': 'Wilson Tembo',
      'status': 'Rejected',
      'submittedDate': '2025-10-12',
      'premium': '\R95.00',
    },
  ];

  Color _getStatusColor(String status) {
    switch (status) {
      case 'Approved':
        return Colors.green;
      case 'Rejected':
        return Colors.red;
      case 'Under Review':
        return Colors.orange;
      case 'Pending':
      default:
        return Colors.blue;
    }
  }

  @override
  Widget build(BuildContext context) {
    final filteredApplications = selectedFilter == 'All'
        ? applications
        : applications.where((app) => app['status'] == selectedFilter).toList();

    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Insurance Applications',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                ElevatedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.add),
                  label: const Text('New Application'),
                ),
              ],
            ),
            const SizedBox(height: 16),
            
            SizedBox(
              height: 40,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: filters.length,
                itemBuilder: (context, index) {
                  final filter = filters[index];
                  final isSelected = selectedFilter == filter;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8.0),
                    child: FilterChip(
                      label: Text(filter),
                      selected: isSelected,
                      onSelected: (selected) {
                        setState(() {
                          selectedFilter = filter;
                        });
                      },
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 16),

            Expanded(
              child: ListView.builder(
                itemCount: filteredApplications.length,
                itemBuilder: (context, index) {
                  final app = filteredApplications[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    child: ListTile(
                      contentPadding: const EdgeInsets.all(16),
                      leading: CircleAvatar(
                        backgroundColor: Theme.of(context).primaryColor.withOpacity(0.1),
                        child: Icon(
                          app['AnimalType'] == 'Cattle' ? Icons.comment_outlined : Icons.comment_outlined,
                          color: Theme.of(context).primaryColor,
                        ),
                      ),
                      title: Text(
                        '${app['AnimalName']} - ${app['breed']}',
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Owner: ${app['ownerName']}'),
                          Text('Application ID: ${app['id']}'),
                          Text('Submitted: ${app['submittedDate']}'),
                          const SizedBox(height: 4),
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: _getStatusColor(app['status']).withOpacity(0.1),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Text(
                                  app['status'],
                                  style: TextStyle(
                                    color: _getStatusColor(app['status']),
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                              const Spacer(),
                              Text(
                                app['premium'],
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      trailing: PopupMenuButton(
                        itemBuilder: (context) => [
                          const PopupMenuItem(
                            value: 'view',
                            child: Text('View Details'),
                          ),
                          const PopupMenuItem(
                            value: 'approve',
                            child: Text('Approve'),
                          ),
                          const PopupMenuItem(
                            value: 'reject',
                            child: Text('Reject'),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
