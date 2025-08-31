import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class StatCard {
  final String name;
  final String value;
  final String change;
  final IconData icon;

  StatCard({
    required this.name,
    required this.value,
    required this.change,
    required this.icon,
  });
}

class Application {
  final String id;
  final String vetName;
  final String clinic;
  final String status;
  final String submittedAt;

  Application({
    required this.id,
    required this.vetName,
    required this.clinic,
    required this.status,
    required this.submittedAt,
  });
}

class Claim {
  final String id;
  final String petName;
  final String owner;
  final String amount;
  final String type;
  final String status;

  Claim({
    required this.id,
    required this.petName,
    required this.owner,
    required this.amount,
    required this.type,
    required this.status,
  });
}

class DashboardOverview extends StatelessWidget {
  const DashboardOverview({super.key});

  List<StatCard> get stats => [
    StatCard(name: 'Total Applications', value: '247', change: '+12%', icon: Icons.description),
    StatCard(name: 'Pending Claims', value: '18', change: '-5%', icon: Icons.assignment),
    StatCard(name: 'Monthly Payments', value: '\$45,231', change: '+8%', icon: Icons.payment),
    StatCard(name: 'Active Vets', value: '89', change: '+3%', icon: Icons.people),
  ];

  List<Application> get recentApplications => [
    Application(
      id: 'APP-001',
      vetName: 'Dr. Sarah Johnson',
      clinic: 'Paws & Claws Veterinary',
      status: 'pending',
      submittedAt: '2 hours ago',
    ),
    Application(
      id: 'APP-002',
      vetName: 'Dr. Michael Chen',
      clinic: 'City Animal Hospital',
      status: 'approved',
      submittedAt: '4 hours ago',
    ),
    Application(
      id: 'APP-003',
      vetName: 'Dr. Emily Rodriguez',
      clinic: 'Westside Pet Care',
      status: 'review',
      submittedAt: '6 hours ago',
    ),
  ];

  List<Claim> get pendingClaims => [
    Claim(
      id: 'CLM-001',
      petName: 'Max',
      owner: 'John Smith',
      amount: '\$1,250',
      type: 'Surgery',
      status: 'review',
    ),
    Claim(
      id: 'CLM-002',
      petName: 'Luna',
      owner: 'Maria Garcia',
      amount: '\$450',
      type: 'Medication',
      status: 'pending',
    ),
    Claim(
      id: 'CLM-003',
      petName: 'Charlie',
      owner: 'David Wilson',
      amount: '\$890',
      type: 'Emergency',
      status: 'approved',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          const Text(
            'Dashboard Overview',
            style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          Text(
            'Monitor your veterinary insurance operations and key metrics',
            style: TextStyle(color: Theme.of(context).colorScheme.onSurfaceVariant),
          ),
          const SizedBox(height: 32),

          // Stats Grid
          LayoutBuilder(
            builder: (context, constraints) {
              final crossAxisCount = constraints.maxWidth > 1200 ? 4 :
                                   constraints.maxWidth > 800 ? 2 : 1;
              return GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: crossAxisCount,
                  crossAxisSpacing: 24,
                  mainAxisSpacing: 24,
                  childAspectRatio: 1.5,
                ),
                itemCount: stats.length,
                itemBuilder: (context, index) => _buildStatCard(context, stats[index]),
              );
            },
          ),
          const SizedBox(height: 32),

          // Recent Activity
          LayoutBuilder(
            builder: (context, constraints) {
              if (constraints.maxWidth > 1024) {
                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(child: _buildRecentApplications(context)),
                    const SizedBox(width: 24),
                    Expanded(child: _buildPendingClaims(context)),
                  ],
                );
              } else {
                return Column(
                  children: [
                    _buildRecentApplications(context),
                    const SizedBox(height: 24),
                    _buildPendingClaims(context),
                  ],
                );
              }
            },
          ),
        ],
      ),
    );
  }

  Widget _buildStatCard(BuildContext context, StatCard stat) {
    final theme = Theme.of(context);

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  stat.name,
                  style: TextStyle(
                    fontSize: 14,
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                Icon(stat.icon, color: theme.colorScheme.onSurfaceVariant),
              ],
            ),
            const Spacer(),
            Text(
              stat.value,
              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 4),
            Row(
              children: [
                Icon(Icons.trending_up, size: 12, color: Colors.green[600]),
                const SizedBox(width: 4),
                Text(
                  stat.change,
                  style: TextStyle(fontSize: 12, color: Colors.green[600]),
                ),
                const SizedBox(width: 4),
                Text(
                  'from last month',
                  style: TextStyle(
                    fontSize: 12,
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRecentApplications(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Recent Applications',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 4),
            Text(
              'Latest veterinary insurance applications submitted',
              style: TextStyle(color: Theme.of(context).colorScheme.onSurfaceVariant),
            ),
            const SizedBox(height: 16),
            ...recentApplications.map((app) => _buildApplicationItem(context, app)),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                onPressed: () => context.go('/applications'),
                child: const Text('View All Applications'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPendingClaims(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Pending Claims',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 4),
            Text(
              'Claims requiring review or processing',
              style: TextStyle(color: Theme.of(context).colorScheme.onSurfaceVariant),
            ),
            const SizedBox(height: 16),
            ...pendingClaims.map((claim) => _buildClaimItem(context, claim)),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                onPressed: () => context.go('/claims'),
                child: const Text('View All Claims'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildApplicationItem(BuildContext context, Application app) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(app.vetName, style: const TextStyle(fontWeight: FontWeight.w500)),
                Text(
                  app.clinic,
                  style: TextStyle(
                    fontSize: 12,
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                  ),
                ),
                Text(
                  app.submittedAt,
                  style: TextStyle(
                    fontSize: 12,
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                  ),
                ),
              ],
            ),
          ),
          _buildStatusBadge(app.status),
        ],
      ),
    );
  }

  Widget _buildClaimItem(BuildContext context, Claim claim) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '${claim.petName} - ${claim.owner}',
                  style: const TextStyle(fontWeight: FontWeight.w500),
                ),
                Text(
                  claim.type,
                  style: TextStyle(
                    fontSize: 12,
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                  ),
                ),
                Text(
                  claim.amount,
                  style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
                ),
              ],
            ),
          ),
          _buildStatusBadge(claim.status),
        ],
      ),
    );
  }

  Widget _buildStatusBadge(String status) {
    Color backgroundColor;
    Color textColor;
    IconData icon;

    switch (status) {
      case 'approved':
        backgroundColor = Colors.green[100]!;
        textColor = Colors.green[800]!;
        icon = Icons.check_circle;
        break;
      case 'pending':
        backgroundColor = Colors.yellow[100]!;
        textColor = Colors.yellow[800]!;
        icon = Icons.access_time;
        break;
      case 'review':
        backgroundColor = Colors.blue[100]!;
        textColor = Colors.blue[800]!;
        icon = Icons.info;
        break;
      default:
        backgroundColor = Colors.grey[100]!;
        textColor = Colors.grey[800]!;
        icon = Icons.help;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 12, color: textColor),
          const SizedBox(width: 4),
          Text(
            status[0].toUpperCase() + status.substring(1),
            style: TextStyle(fontSize: 12, color: textColor, fontWeight: FontWeight.w500),
          ),
        ],
      ),
    );
  }
}
